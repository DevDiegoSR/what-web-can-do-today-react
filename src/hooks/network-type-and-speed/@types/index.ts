export type TConnection = {
  networkType:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "none"
    | "wifi"
    | "wimax"
    | "other"
    | "unknown";
  effectiveNetworkType: "slow-2g" | "2g" | "3g" | "4g";
  downlinkMax: number;
  timestamp: number;
};
