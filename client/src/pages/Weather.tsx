import { SyntheticEvent, useEffect, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { ForecastDay } from "../graphql/schema";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Container,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
  
} from "@mui/material";


const API_KEY: string = "9d6802e26abe49c1944162301220512";
const weekday:string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface ForecastWeatherResponse {
  forecast: {
    forecastday: ForecastDay[];
  };
}

const getForecast = async (city: string): Promise<ForecastWeatherResponse> => {
  if (city == "") city = "Jerusalem";
  const response: Response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=no`);

  if (response.ok) {
    console.log(response.json);
    return await response.json();
  }
  throw (await response.json());
};


const Weather = (): JSX.Element => {
  const [forecastDay, setForecastDay] = useState<ForecastDay[] | null>(null);
  const [errMessage, setErrMessage] = useState<String | null>(null);

  const handleErrClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setErrMessage(null);
  };

  useEffect(() => {
    getForecast("")
      .then((result: ForecastWeatherResponse) => {
        console.log("forecast result");

        console.log(result);

        setForecastDay(result.forecast.forecastday);
      })
      .catch((err) => {
        setErrMessage("Failed to load weather forecast.");
        console.log("get forecast here before error");

        console.log(err);
      });
  }, []);


  return (
    <AppLayout title="Weather">
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1">
          Weather Forecast in Jerusalem
        </Typography>

        {forecastDay ? (

          <Grid container spacing={2} >

            {forecastDay.map((day: ForecastDay, key: number) => (
              <Grid item key={key} textAlign="center" >
                <Card sx={{ width: '100%', height: 'auto', padding:3 }}>
                  <CardHeader
                    title={weekday[new Date(day.date).getDay()]}
                    subheader={new Date(day.date).toDateString()}
                  />
                  <Typography >
                    Sunrise: {day.astro.sunrise}
                  </Typography>
                  <Typography >
                    Sunset: {day.astro.sunset}

                  </Typography>
                  <CardContent>

                    <Typography>
                      {day.day.mintemp_c.toString()} - {day.day.maxtemp_c.toString()}
                    </Typography>

                    <Typography textAlign={"center"}>
                      {day.day.condition.text}
                    </Typography>

                    <Box
                      component="img"
                      sx={{
                        height: 60,
                        width: 60,
                        marginTop: 5,
                      }}
                      alt={day.day.condition.text}
                      src={day.day.condition.icon}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box >
            <CircularProgress />
          </Box>
        )}


        <Typography >
          Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
        </Typography>

      </Container>

      <Snackbar
        open={errMessage != null}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleErrClose}
      >
        <Alert onClose={handleErrClose} variant="filled" severity="error">
          {errMessage}
        </Alert>
      </Snackbar>
    </AppLayout>
  );
};

export { Weather };
