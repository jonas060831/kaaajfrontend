import { Button, Html } from "@react-email/components";

export default function TestEmail() {
  return (
    <Html>
      <Button
        href="https://google.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
}