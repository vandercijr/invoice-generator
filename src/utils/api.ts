import { format } from "date-fns";
import { fetchData } from "./db";

export const fetchHarvestData = async () => {
  const config = await fetchData("apiConfig", 1);
  const invoiceInfo = await fetchData("invoice", 1);
  const { accountId, token } = config;
  const { from, to } = invoiceInfo;

  if (!token || !accountId) {
    throw new Error("Missing Harvest credentials in IndexedDB");
  }

  const res = await fetch(
    `https://api.harvestapp.com/v2/reports/time/projects?from=${format(
      new Date(from.replace("-", "/")),
      "yyyyMMdd"
    )}&to=${format(new Date(to.replace("-", "/")), "yyyyMMdd")}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Harvest-Account-Id": accountId,
      },
    }
  );
  const data = await res.json();

  return data.results || [];
};
