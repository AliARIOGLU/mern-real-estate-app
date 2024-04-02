import "./list.scss";

import { Card } from "../card/card";

function List({ posts }) {
  if (posts.length === 0) {
    return <h2>There is no posts!</h2>;
  }

  return (
    <div className="list">
      {posts?.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
