import { AbstractStore } from "./abstract_store";
import { ServerData } from "./server_data";

export interface Cloud {
  cloudDescription: string;
  cloudName: string;
  geoLatitude: number;
  geoLongitude: number;
  geoRegion: string;
}

export interface RootCloud {
  clouds: Cloud[];
}

class CloudStore extends AbstractStore<
  ServerData<GetCloudsResponse.RootCloud>,
  RootCloud
> {
  constructor(initialData: ServerData<GetCloudsResponse.RootCloud>) {
    super(initialData);
  }

  protected adaptData(
    data: ServerData<GetCloudsResponse.RootCloud>
  ): RootCloud {
    return {
      clouds: data
        .get()
        ?.clouds?.map(
          ({
            cloud_description,
            cloud_name,
            geo_latitude,
            geo_longitude,
            geo_region,
          }) => ({
            cloudDescription: cloud_description,
            cloudName: cloud_name,
            geoLatitude: geo_latitude,
            geoLongitude: geo_longitude,
            geoRegion: geo_region,
          })
        ),
    };
  }
}

// expose a single instance of the cloud store
export const cloudStore: CloudStore = new CloudStore(
  new ServerData<GetCloudsResponse.RootCloud>({
    fetch: () =>
      fetch("https://api.aiven.io/v1/clouds").then((result) =>
        result.json()
      ) as Promise<GetCloudsResponse.RootCloud>,
  })
);

/**
 * Generated interfaces after navigating to  https://api.aiven.io/v1/clouds and converting the response using
 * http://json2ts.com/
 *
 * Encapsulating the server interfaces from the actually used interfaces in the frontend application allows easier
 * adoption of new interfaces coming from the backend, as the only data adaptation is happening in the store.
 *
 * Therefore, I usually go for adopting the data right where it is received in order to avoid having to change the app
 * just because the backend datastructure changed.
 */
declare namespace GetCloudsResponse {
  export interface Cloud {
    cloud_description: string;
    cloud_name: string;
    geo_latitude: number;
    geo_longitude: number;
    geo_region: string;
  }

  export interface RootCloud {
    clouds: Cloud[];
  }
}
