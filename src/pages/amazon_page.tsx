import React from "react";
import { CloudComponent } from "../cloud/cloud";
import { createCloudPage } from "./create_cloud_page";

export const AmazonPage = createCloudPage<{}>(
  (props) => {
    return (
      <div>
        {props.clouds?.map((cloud) => {
          return (
            <CloudComponent
              key={cloud.cloudName + cloud.cloudDescription}
              {...cloud}
            />
          );
        })}
      </div>
    );
  },
  {
    fallback: "Loading amazon clouds...",
    cloudNamePrefix: "aws-",
  }
);
