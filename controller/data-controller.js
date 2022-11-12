const dataModel = require("../models/main-schema");
const { StatusCodes } = require("http-status-codes");
const errorIndex = require("../errors/index");

// get data
exports.getData = async (req, res, next) => {
  const {
    end_year,
    intensity,
    sector,
    topic,
    region,
    start_year,
    country,
    relevance,
    pestle,
    likelihood,
    fields,
    sort,
    limit,
    page,
  } = req.query;

  // search query
  const queryObject = {};
  if (end_year) queryObject.end_year = { $regex: end_year, $options: "i" };
  if (intensity) queryObject.intensity = Number(intensity);
  if (sector) queryObject.sector = { $regex: sector, $options: "i" };
  if (topic) queryObject.topic = { $regex: topic, $options: "i" };
  if (region) queryObject.region = { $regex: region, $options: "i" };
  if (start_year)
    queryObject.start_year = { $regex: start_year, $options: "i" };
  if (country) queryObject.country = { $regex: country, $options: "i" };
  if (relevance) queryObject.relevance = Number(relevance);
  if (pestle) queryObject.pestle = { $regex: pestle, $options: "i" };
  if (likelihood) queryObject.likelihood = Number(likelihood);

  //field query
  let field_query = "";
  field_query = fields?.split(",").join(" ");

  //sort query
  let sort_query = "";
  sort_query = sort?.split(",").join(" ");

  // limiting query
  const limit_query = limit || 10;
  const page_number = page || 1;
  const skip_query = (page_number - 1) * limit_query;

  // retrieving data
  const data = await dataModel
    .find(queryObject)
    .select(field_query)
    .sort(sort_query)
    .limit(limit_query)
    .skip(skip_query);
  res.status(StatusCodes.OK).json(data);
};
