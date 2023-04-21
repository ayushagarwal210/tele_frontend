import React from "react";
import { Button } from "react-bootstrap";
import { gapi } from "gapi-script";
import { useState } from "react";

function GoogleEventComponent({ followUp }) {
  const API_KEY = "AIzaSyCsw7BqvE8imVBayl1_8bxa7 - Tr0CAPjQk";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const CLIENT_ID =
    "403030062936-eq0anbg0f2r4ak5hj3je0qtein5kfh5q.apps.googleusercontent.com";
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";
  const [disableButton, setDisableButton] = useState(false);
  const handleClick = () => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          console.log("initialized client");

          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
              console.log("authenticated");

              const event = {
                summary: "Follow-up TeleConsultation",
                start: {
                  dateTime: followUp + "T17:00:00+05:30",
                  timeZone: "Asia/Kolkata",
                },
                end: {
                  dateTime: followUp + "T17:00:00+05:30",
                  timeZone: "Asia/Kolkata",
                },
              };

              const request = gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: event,
              });

              request.execute((event) => {
                console.log(`Event created: ${event.htmlLink}`);
                setDisableButton(true);
              });
            });
        });
    });
  };
  return (
    <div>
      {!disableButton ? (
        <Button onClick={handleClick}>Add To Google Calendar</Button>
      ) : (
        <Button disabled>Added To Google Calendar</Button>
      )}
    </div>
  );
}

export default GoogleEventComponent;
