const int emgPin = A5; // Analog pin for EMG sensor

unsigned long previousMillis = 0;
const long interval = 10; // Record data every 1 second

void setup() {
  Serial.begin(9600);
  while (!Serial);
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    // Update previousMillis
    previousMillis = currentMillis;

    // Get current time
    int seconds = currentMillis / 1000;
    int minutes = seconds / 60;
    int hours = minutes / 60;

    // Adjust for current time
    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    // Read EMG sensor value
    float emgValue = analogRead(emgPin);
    float voltage = emgValue * (5.0 / 1023.0); // Convert to voltage
    float emgSignal = voltage * 1000; // Convert to mV

    // Write date, time, and EMG value to serial port
    Serial.print(hours);
    Serial.print(':');
    Serial.print(minutes);
    Serial.print(':');
    Serial.print(seconds);
    Serial.print(',');
    Serial.println(emgSignal);
  }
}
