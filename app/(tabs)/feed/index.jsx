import { Link } from "expo-router";
import Card from "../../../components/Card";

export default function Tab() {
  return (
    <>
      <Card title="TODO: Theme Banner">
        <Link className="text-right" href="/feed/theme">
          See more
        </Link>
      </Card>
      <Card title="TODO: On this day!">
        <Link className="text-right" href="/feed/on-this-day">
          See more
        </Link>
      </Card>
      <Card title="TODO: Top Routes">
        <Link className="text-right" href="/feed/top-routes">
          See more
        </Link>
      </Card>
      <Card title="TODO: Latest Addition">
        <Link className="text-right" href="/feed/new-spots">
          See more
        </Link>
      </Card>
    </>
  );
}
