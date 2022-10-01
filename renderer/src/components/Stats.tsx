import { DistanceSVG } from "./DistanceSVG";
import { PredictiveAnalyticsSVG } from "./PredictiveAnalyticsSVG";
import { StatContainer } from "./StatContainer";
import { TimeSVG } from "./TimeSVG";

function minutesToObj(min: number): { hours: number; minutes: number } {
  const hours = Math.floor(min / 60);
  const minutes = Math.floor(min % 60);
  return { hours, minutes };
}

const Stats: React.FC<any> = ({ totals }) => {
  const totalDuration = minutesToObj(totals?.duration || 0);
  const distance = new Intl.NumberFormat("nl-BE", {
    style: "unit",
    unit: "kilometer",
    unitDisplay: "short",
  }).formatToParts((totals?.distance || 0) / 1000);
  const hours = new Intl.NumberFormat("nl-BE", {
    style: "unit",
    unit: "hour",
    unitDisplay: "narrow",
  }).formatToParts(totalDuration.hours);
  const minutes = new Intl.NumberFormat("nl-BE", {
    style: "unit",
    unit: "minute",
    unitDisplay: "narrow",
  }).formatToParts(totalDuration.minutes);
  const calories = new Intl.NumberFormat("nl-BE", {
    style: "decimal",
  }).formatToParts(totals?.calories || 0);

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <StatContainer title="Totale afstand" Icon={PredictiveAnalyticsSVG}>
        <span className="text-5xl text-slate-700">
          {distance
            .filter((item) => item.type != "unit")
            .map((item) => item.value)
            .join("")}
        </span>
        <span className="text-base text-slate-700">
          {distance.find((item) => item.type == "unit")?.value}
        </span>
      </StatContainer>
      <StatContainer title="Totale tijd" Icon={TimeSVG}>
        {totalDuration.hours > 0 ? (
          <span>
            <span className="text-5xl text-slate-700">
              {hours
                .filter((item) => item.type !== "unit")
                .map((item) => item.value)
                .join("")}
            </span>
            <span className="text-base text-slate-700">
              {hours.find((item) => item.type === "unit")?.value}{" "}
            </span>
          </span>
        ) : null}
        <span className="ml-1 text-5xl text-slate-700">
          {minutes
            .filter((item) => item.type !== "unit")
            .map((item) => item.value)
            .join("")}
        </span>
        <span className="text-base text-slate-700">
          {minutes.find((item) => item.type === "unit")?.value}
        </span>
      </StatContainer>
      <StatContainer title="Totale verbranding" Icon={DistanceSVG}>
        <span className="ml-1 text-5xl text-slate-700">
        {calories
            .filter((item) => item.type !== "unit")
            .map((item) => item.value)
            .join("")}{" "}
        </span>
        <span className="text-base text-slate-700">kcal</span>
      </StatContainer>
    </div>
  );
};

export { Stats };
