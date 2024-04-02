import "./list-page.scss";

import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

import { Filter } from "../../components/filter/filter";
import { Card } from "../../components/card/card";
import { Map } from "../../components/map/map";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="list-page">
      <div className="list-container">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<div>Loading...</div>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Something went wrong!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="map-container">
        <Suspense fallback={<div>Loading...</div>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Something went wrong!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
