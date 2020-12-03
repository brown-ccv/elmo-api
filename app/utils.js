const aq = require("arquero");
const op = aq.op;

// downsample the buoy points to approximately the desired number of points
const getAtGranularity = (data, granularity, variable) => {
  if (granularity === 'hour') return data;

  let dt = aq.from(data);

  if (granularity == 'day') {
    return dt
      .derive({
        timestamp: (d) =>
          op.datetime(
            op.year(d.timestamp),
            op.month(d.timestamp),
            op.date(d.timestamp),
          ),
      })
      .groupby("timestamp")
      .rollup({ variable: op.sum(variable) })
      .objects();
  }

  if (granularity == 'month') {
    return dt
      .derive({
        timestamp: (d) =>
          op.datetime(
            op.year(d.timestamp),
            op.month(d.timestamp)
          ),
      })
      .groupby("timestamp")
      .rollup({ variable: op.sum(variable) })
      .objects();
  }

  throw "unknown granularity";

};

module.exports = {
  getAtGranularity,
};
