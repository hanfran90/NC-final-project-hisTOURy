import { Link } from "expo-router";
import Card from "../../../components/Card";

export default function Tab() {
  return (
    <>
      <Card title="TODO: Theme Banner">
        <Link href="/feed/theme">See more</Link>
      </Card>
      <Card title="TODO: On this day!">
        <Link href="/feed/on-this-day">See more</Link>
      </Card>
      <Card title="TODO: Top Routes">
        <Link href="/feed/top-routes">See more</Link>
      </Card>
      <Card title="TODO: Latest Addition">
        <Link href="/feed/new-spots">See more</Link>
      </Card>
    </>
  );
}
