import { Link } from "expo-router";
import Card from "../../../components/Card";
import { Text, View } from "react-native";

export default function Tab() {
  return (
    
    <View>
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
      </View>
    
  );
}
