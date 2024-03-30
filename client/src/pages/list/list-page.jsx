import "./list-page.scss";

import { listData as data } from "../../lib/dummydata";
import { Filter } from "../../components/filter/filter";
import { Card } from "../../components/card/card";
import { Map } from "../../components/map/map";

function ListPage() {
  return (
    <div className="list-page">
      <div className="list-container">
        <div className="wrapper">
          <Filter />
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="map-container">
        <Map items={data} />
      </div>
    </div>
  );
}

export default ListPage;
