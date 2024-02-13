import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';

const parkingSVG = `<svg></svg>`;

const initialCars = [
  { id: 'car1', isVisible: true, position: { x: 50, y: 100 }, src: require('../../assets/car_top_view.png') },
  { id: 'car2', isVisible: true, position: { x: 150, y: 200 }, src: require('../../assets/car_top_view.png') },
  { id: 'car3', isVisible: true, position: { x: 250, y: 300 }, src: require('../../assets/car_top_view.png') },
];

const fetchParkingState = async () => {

  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Mock
  return [
    { id: 'car1', isVisible: true },
    { id: 'car2', isVisible: true },
    { id: 'car3', isVisible: true },
  ];
};

const ParkingSection = () => {
  const [cars, setCars] = useState(initialCars);

  useEffect(() => {
    fetchParkingState().then((fetchedCars) => {
      setCars(currentCars =>
        currentCars.map(car => {
          const fetchedCar = fetchedCars.find(fCar => fCar.id === car.id);
          return fetchedCar ? { ...car, isVisible: fetchedCar.isVisible } : car;
        })
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <SvgXml xml={parkingSVG} width="100%" height="100%" />
      {cars.map((car) =>
        car.isVisible && (
          <Image
            key={car.id}
            source={car.src}
            style={{
              position: 'absolute',
              left: car.position.x,
              top: car.position.y,
              width: 50,
              height: 50,
            }}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ParkingSection;