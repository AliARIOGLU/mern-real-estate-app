import "./list-page.scss";

import { useLoaderData } from "react-router-dom";

import { Filter } from "../../components/filter/filter";
import { Card } from "../../components/card/card";
import { Map } from "../../components/map/map";

function ListPage() {
  const posts = useLoaderData();
  console.log(posts);

  return (
    <div className="list-page">
      <div className="list-container">
        <div className="wrapper">
          <Filter />
          {posts.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="map-container">
        <Map items={posts} />
      </div>
    </div>
  );
}

export default ListPage;
