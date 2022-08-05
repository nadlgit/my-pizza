export type MapProps = { latitude?: number; longitude?: number };

export const Map = ({ latitude = 0, longitude = 0 }: MapProps) => {
  return <div style={{ width: '100%', height: '100%', backgroundColor: 'hsl(0,0%,90%)' }}></div>;
};
