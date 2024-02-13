import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Title, Paragraph, Button } from "react-native-paper";

const PaymentReportScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Previous Payment History</Title>
          {/* List of payment history items */}
          <Paragraph>Payment on 2023-08-20: Rs 500.00</Paragraph>
          <Paragraph>Payment on 2023-08-15: Rs 750.00</Paragraph>
          {/* Add more payment history items */}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>This Month's Bill</Title>
          <Paragraph style={styles.cardValue}>Rs 1500.00</Paragraph>
        </Card.Content>
      </Card>

      <Button mode="contained" style={{ marginTop: 48 }}>
        Pay Now
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default PaymentReportScreen;
