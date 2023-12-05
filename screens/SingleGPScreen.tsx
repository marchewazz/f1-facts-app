import { View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import RaceSchedule from "../models/RaceSchedule.model";
import { useCallback, useEffect, useRef, useState } from "react";
import { getDate, getTime } from "../util/dateFunctions";
import RaceResults from "../models/RaceResults.model";
import RaceResultsDisplay from "../components/Results/RaceResultsDisplay";
import SprintResultsDisplay from "../components/Results/SprintResultsDisplay";
import GPCountdown from "../components/SingleGP/GPCountdown";
import QualifyingResults from "../models/QualifyingResults.model";
import QualifyingResultsDisplay from "../components/Results/QualifyingResultsDisplay";
import TrackMarkerMap from "../components/SingleGP/TrackMarkerMap";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import LoadingComponent from "../components/LoadingComponent";

export default function SingleGPScreen(props: any) {
  const [schedule, setSchedule] = useState<RaceSchedule>();
  const [raceResults, setRaceResults] = useState<RaceResults>();
  const [sprintResults, setSprintResults] = useState<RaceResults>();
  const [qualifyingResults, setQualifyingResults] =
    useState<QualifyingResults>();
  const [tab, setTab] = useState<string>("race");

  const [ready, setReady] = useState<boolean>(false);

  const mapRef = useRef(null);
  const scrollViewRef = useRef(null);

  async function fetchRaceResults() {
    try {
      const response = await fetch(
        `http://ergast.com/api/f1/${props.route.params.schedule.season}/${props.route.params.schedule.round}/results.json`
      );
      const json = await response.json();

      setRaceResults(json.MRData.RaceTable.Races[0].Results as RaceResults);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchSprintResults() {
    try {
      const response = await fetch(
        `http://ergast.com/api/f1/${props.route.params.schedule.season}/${props.route.params.schedule.round}/sprint.json`
      );
      const json = await response.json();

      setSprintResults(
        json.MRData.RaceTable.Races[0].SprintResults as RaceResults
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchQualifyingResults() {
    try {
      const response = await fetch(
        `http://ergast.com/api/f1/${props.route.params.schedule.season}/${props.route.params.schedule.round}/qualifying.json`
      );
      const json = await response.json();

      setQualifyingResults(
        json.MRData.RaceTable.Races[0].QualifyingResults as QualifyingResults
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchData() {
    if (props.route.params.schedule?.season >= "2003") {
      if (props.route.params.schedule?.Qualifying) {
        if (
          new Date(
            `${props.route.params.schedule.Qualifying?.date}T${
              props.route.params.schedule.Qualifying?.time ?? "0:00:00"
            }`
          ).getTime() < new Date().getTime()
        )
          fetchQualifyingResults();
      } else fetchQualifyingResults();
    }
    if (
      props.route.params.schedule?.Sprint &&
      new Date(
        `${props.route.params.schedule.Sprint?.date}T${
          props.route.params.schedule.Sprint?.time ?? "0:00:00"
        }`
      ).getTime() < new Date().getTime()
    ) {
      await fetchSprintResults();
      setTab("sprint");
    }
    if (
      new Date(
        `${props.route.params.schedule.date}T${
          props.route.params.schedule.time ?? "0:00:00"
        }`
      ).getTime() < new Date().getTime()
    ) {
      await fetchRaceResults();
      setTab("race");
    }
    setReady(true);
  }

  useEffect(() => {
    if (schedule) {
      if (schedule.FirstPractice)
        schedule.FirstPractice.localTime = new Date(
          `${schedule.FirstPractice?.date}T${
            schedule.FirstPractice?.time ?? "0:00:00"
          }`
        );
      if (schedule.SecondPractice)
        schedule.SecondPractice.localTime = new Date(
          `${schedule.SecondPractice?.date}T${
            schedule.SecondPractice?.time ?? "0:00:00"
          }`
        );
      if (schedule.ThirdPractice)
        schedule.ThirdPractice.localTime = new Date(
          `${schedule.ThirdPractice?.date}T${
            schedule.ThirdPractice?.time ?? "0:00:00"
          }`
        );
      if (schedule.Qualifying)
        schedule.Qualifying.localTime = new Date(
          `${schedule.Qualifying?.date}T${
            schedule.Qualifying?.time ?? "0:00:00"
          }`
        );
      if (schedule.Sprint)
        schedule.Sprint.localTime = new Date(
          `${schedule.Sprint?.date}T${schedule.Sprint?.time ?? "0:00:00"}`
        );
      if (schedule.date)
        schedule.localTime = new Date(
          `${schedule.date}T${schedule.time ?? "0:00:00"}`
        );
    }
  }, [schedule]);

  useFocusEffect(
    useCallback(() => {
      setSchedule(props.route.params.schedule);
      fetchData();
      return () => {
        setReady(false);
        setTab("race");
        setRaceResults(undefined);
        setSprintResults(undefined);
        setQualifyingResults(undefined);
        setSchedule(undefined);
      }
    }, [])
  );

  return (
      <ScrollView
      ref={scrollViewRef}
      className="bg-main-background py-2"
      style={{ height: Dimensions.get("window").height - 119 }}
      >
      {ready && schedule?.localTime ? (
        <View className="py-1">
          <View className="px-2">
            <Text className="text-white text-3xl font-extrabold italic">{`${schedule.season} ${schedule.raceName}`}</Text>
            <View className="flex flex-row justify-between items-center my-2">
              <Text className="text-white text-2xl font-extrabold w-4/5">
                {schedule.Circuit.circuitName}
              </Text>
              <TouchableOpacity className="bg-white p-2 rounded-xl" onPress={() => { scrollViewRef.current.scrollTo({ x: 0, y: Dimensions.get("window").height + mapRef.current.props.style.height, animated: true }) }}>
                <FontAwesomeIcon icon={faLocationDot} size={30} color="#FF1801" />
              </TouchableOpacity>
            </View>
            
            {schedule.Sprint ? (
              <>
                {schedule.season === "2023" ? (
                  <>
                    {schedule.FirstPractice ? (
                      <Text className="text-white text-lg">
                        {`First practice: ${getDate(
                          schedule.FirstPractice.localTime
                        )} ${
                          schedule.FirstPractice.time
                            ? getTime(schedule.FirstPractice.localTime)
                            : ""
                        }`}
                      </Text>
                    ) : null}
                    {schedule.Qualifying || qualifyingResults ? (
                      <Text
                        className="text-white text-lg"
                        onPress={() => {
                          if (qualifyingResults) setTab("qualifying");
                        }}
                      >
                        <Text
                          className={`${qualifyingResults ? "underline" : ""}`}
                        >
                          Qualifying
                        </Text>
                        {schedule.Qualifying ? (
                          <>
                            {`: ${getDate(schedule.Qualifying.localTime)} ${
                              schedule.Qualifying.time
                                ? getTime(schedule.Qualifying.localTime)
                                : ""
                            }`}
                          </>
                        ) : null}
                      </Text>
                    ) : null}
                    {schedule.SecondPractice ? (
                      <Text className="text-white text-lg">
                        {`Sprint qualifying: ${getDate(
                          schedule.SecondPractice.localTime
                        )} ${
                          schedule.SecondPractice.time
                            ? getTime(schedule.SecondPractice.localTime)
                            : ""
                        }`}
                      </Text>
                    ) : null}
                    {schedule.Sprint ? (
                      <Text
                        className="text-white text-lg"
                        onPress={() => {
                          if (sprintResults) setTab("sprint");
                        }}
                      >
                        <Text className={`${sprintResults ? "underline" : ""}`}>
                          Sprint
                        </Text>
                        {`: ${getDate(schedule.Sprint.localTime)} ${
                          schedule.Sprint.time
                            ? getTime(schedule.Sprint.localTime)
                            : ""
                        }`}
                      </Text>
                    ) : null}
                  </>
                ) : (
                  <>
                    {schedule.FirstPractice ? (
                      <Text className="text-white text-lg">
                        {`First practice: ${getDate(
                          schedule.FirstPractice.localTime
                        )} ${
                          schedule.FirstPractice.time
                            ? getTime(schedule.FirstPractice.localTime)
                            : ""
                        }`}
                      </Text>
                    ) : null}
                    {schedule.Qualifying || qualifyingResults ? (
                      <Text
                        className="text-white text-lg"
                        onPress={() => {
                          if (qualifyingResults) setTab("qualifying");
                        }}
                      >
                        <Text
                          className={`${qualifyingResults ? "underline" : ""}`}
                        >
                          Qualifying
                        </Text>
                        {schedule.Qualifying ? (
                          <>
                            {`: ${getDate(schedule.Qualifying.localTime)} ${
                              schedule.Qualifying.time
                                ? getTime(schedule.Qualifying.localTime)
                                : ""
                            }`}
                          </>
                        ) : null}
                      </Text>
                    ) : null}
                    {schedule.SecondPractice ? (
                      <Text className="text-white text-lg">
                        {`Second pracitce: ${getDate(
                          schedule.SecondPractice.localTime
                        )} ${
                          schedule.SecondPractice.time
                            ? getTime(schedule.SecondPractice.localTime)
                            : ""
                        }`}
                      </Text>
                    ) : null}
                    {schedule.Sprint ? (
                      <Text
                        className="text-white text-lg"
                        onPress={() => {
                          if (sprintResults) setTab("sprint");
                        }}
                      >
                        <Text className={`${sprintResults ? "underline" : ""}`}>
                          Sprint
                        </Text>
                        {`: ${getDate(schedule.Sprint.localTime)} ${
                          schedule.Sprint.time
                            ? getTime(schedule.Sprint.localTime)
                            : ""
                        }`}
                      </Text>
                    ) : null}
                  </>
                )}
              </>
            ) : (
              <>
                {schedule.FirstPractice ? (
                  <Text className="text-white text-lg">
                    {`First practice: ${getDate(
                      schedule.FirstPractice.localTime
                    )} ${
                      schedule.FirstPractice.time
                        ? getTime(schedule.FirstPractice.localTime)
                        : ""
                    }`}
                  </Text>
                ) : null}
                {schedule.SecondPractice ? (
                  <Text className="text-white text-lg">
                    {`Second pracitce: ${getDate(
                      schedule.SecondPractice.localTime
                    )} ${
                      schedule.SecondPractice.time
                        ? getTime(schedule.SecondPractice.localTime)
                        : ""
                    }`}
                  </Text>
                ) : null}
                {schedule.ThirdPractice ? (
                  <Text className="text-white text-lg">
                    {`Thrid practice: ${getDate(
                      schedule.ThirdPractice.localTime
                    )} ${
                      schedule.ThirdPractice.time
                        ? getTime(schedule.ThirdPractice.localTime)
                        : ""
                    }`}
                  </Text>
                ) : null}
                {schedule.Qualifying || qualifyingResults ? (
                  <Text
                    className="text-white text-lg"
                    onPress={() => {
                      if (qualifyingResults) setTab("qualifying");
                    }}
                  >
                    <Text className={`${qualifyingResults ? "underline" : ""}`}>
                      Qualifying
                    </Text>
                    {schedule.Qualifying ? (
                      <>
                        {`: ${getDate(schedule.Qualifying.localTime)} ${
                          schedule.Qualifying.time
                            ? getTime(schedule.Qualifying.localTime)
                            : ""
                        }`}
                      </>
                    ) : null}
                  </Text>
                ) : null}
              </>
            )}
          </View>
          <Text
            className="text-white text-lg px-2"
            onPress={() => {
              if (raceResults) setTab("race");
            }}
          >
            <Text className={`${raceResults ? "underline" : ""}`}>Race</Text>
            {`: ${getDate(schedule.localTime)} ${
              schedule.time ? getTime(schedule.localTime) : ""
            }`}
          </Text>
          <View>
            {raceResults || sprintResults ? (
              <>
                {tab == "race" && raceResults ? (
                  <RaceResultsDisplay
                    raceResults={raceResults}
                    season={schedule.season}
                  />
                ) : null}
                {tab == "sprint" && sprintResults ? (
                  <SprintResultsDisplay sprintResults={sprintResults} />
                ) : null}
                {tab == "qualifying" && qualifyingResults ? (
                  <QualifyingResultsDisplay
                    qualifyingResults={qualifyingResults}
                  />
                ) : null}
              </>
            ) : (
              <>
                <GPCountdown raceDate={schedule.localTime} />
              </>
            )}
            <View className="flex flex-row justify-center mt-2 mx-2 mb-5 rounded-2xl overflow-hidden">
              <TrackMarkerMap
                lat={schedule.Circuit.Location.lat}
                long={schedule.Circuit.Location.long}
                mapRef={mapRef}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={{ height: Dimensions.get("window").height - 119 }} className="flex justify-center">
          <LoadingComponent />
        </View>
      )}
      </ScrollView>
   
  );
}
