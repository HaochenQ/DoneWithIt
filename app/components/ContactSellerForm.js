import React from "react";
import * as Yup from "yup";
import { Notifications } from "expo";
import { Alert, Keyboard } from "react-native";

import { AppForm, AppFormField, SubmitButton } from "./forms";

import messageapi from "../api/message";
import logger from "../utility/logger";

export default function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const listingId = listing.id;

    const result = await messageapi.send({
      message,
      listingId,
    });

    if (!result.ok) {
      logger.log("Error", result);
      return Alert.alert("Error", "Could not send message.");
    }

    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: "Success",
      body: "You message was sent to the seller.",
    });
  };
  return (
    <AppForm
      initialValues={{
        message: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        message: Yup.string().required().min(1).label("Message"),
      })}
    >
      <AppFormField
        multiline
        maxLength={255}
        name="message"
        numberOfLines={3}
        placeholder="Message..."
        width={"100%"}
      />
      <SubmitButton title="Contact Seller" />
    </AppForm>
  );
}
