import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import * as Yup from "yup";

import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import useApi from "../hooks/useApi";
import categoriesapi from "../api/categories";
import listingsApi from "../api/listings";
import UpLoadScreen from "./UpLoadScreen";

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, "Please select at least one image."),
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

export default function ListingEditScreen() {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const categoriesApi = useApi(categoriesapi.getCategories);

  useEffect(() => {
    categoriesApi.request();
  }, []);

  const location = useLocation();

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Couldn't save the listing");
    }
    resetForm();
  };

  return (
    <ScrollView>
      <Screen style={styles.container}>
        <UpLoadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <AppForm
          initialValues={{
            images: [],
            title: "",
            price: "",
            description: "",
            category: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />
          <AppFormField maxLength={255} name="title" placeholder="Title" />
          <AppFormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={120}
          />
          <AppFormPicker
            items={categoriesApi.data}
            name="category"
            numberOfColumns={3}
            placeholder="Category"
            width="50%"
            PickerItemComponent={CategoryPickerItem}
          />
          <AppFormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <SubmitButton title="Post" />
        </AppForm>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
