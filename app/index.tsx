import React, { useState } from "react";
import { Text, View } from "react-native";
import FAB from "../components/FAB";
import { Colors } from "../constants/theme";


export default function CalculatorApp() {
  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("");

  const onKey = (d: string) => {
    setExpression((prev) => {
      switch (d) {
        case "C":
          setResult("");
          return "0";
        case "del":
          return prev.length > 1 ? prev.slice(0, -1) : "0";
        case "+/-":
          return prev.startsWith("-") ? prev.slice(1) : "-" + prev;
        case "=":
          try {
            const res = eval(prev.replace(/x/g, "*").replace(/÷/g, "/"));
            setResult(res.toString());
          } catch {
            setResult("Error");
          }
          return prev;
        default:
          return prev === "0" ? d : prev + d;
      }
    });
  };

  const Row = ({ children }: { children: React.ReactNode }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
      {children}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          minHeight: 120,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginBottom: 12,

        }}
      >
        <Text style={{ color: Colors.textPrimary, fontSize: 60 , fontWeight:"500"}}>  {expression.replace(/([+\-x÷])/g, '  $1  ')}
        </Text>
        <Text style={{ color: Colors.darkGray, fontSize: 40, marginVertical:10}}>{result}</Text>
      </View>

      <Row>
        <FAB digit="C" label="C" onKey={onKey} bg={Colors.lightGray} color={Colors.darkGray} />
        <FAB digit="+/-" onKey={onKey} bg={Colors.lightGray} color={Colors.darkGray} />
        <FAB digit="del" label="del" onKey={onKey} bg={Colors.lightGray} color={Colors.darkGray}/>
        <FAB digit="÷" onKey={onKey} bg={Colors.orange} />
      </Row>

      <Row>
        <FAB digit="7" onKey={onKey} />
        <FAB digit="8" onKey={onKey} />
        <FAB digit="9" onKey={onKey} />
        <FAB digit="x" onKey={onKey} bg={Colors.orange} />
      </Row>
      <Row>
        <FAB digit="4" onKey={onKey} />
        <FAB digit="5" onKey={onKey} />
        <FAB digit="6" onKey={onKey} />
        <FAB digit="-" onKey={onKey} bg={Colors.orange} />
      </Row>
      <Row>
        <FAB digit="1" onKey={onKey} />
        <FAB digit="2" onKey={onKey} />
        <FAB digit="3" onKey={onKey} />
        <FAB digit="+" onKey={onKey} bg={Colors.orange} />
      </Row>
      <Row>
        <FAB digit="0" onKey={onKey} extended />
        <FAB digit="." onKey={onKey} />
        <FAB digit="=" onKey={onKey} bg={Colors.orange} />
      </Row>
    </View>
  );
}
