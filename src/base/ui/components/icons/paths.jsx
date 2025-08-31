import { getIconStrokeProps } from "./base";

export function CalenderPath() {
  return (
    <path 
      {...getIconStrokeProps()}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ></path>
  );
}

export function ClockPath() {
  return (
    <path
      {...getIconStrokeProps()}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  );
}

export function LocationPath() {
  const pathData = [
    "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z",
    "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  ];

  return (
    <>
      {pathData.map((d, index) => (
        <path key={index} {...getIconStrokeProps()} d={d} />
      ))}
    </>
  );
}

export function CurrencyPath() {
  return (
    <path 
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    ></path>
  );
}
