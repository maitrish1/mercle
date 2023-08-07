import Highcharts from "highcharts";

export const EngagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    const filteredChannels = channels.filter((channel) =>
      messageCountList.some((msg) => msg.channelId === channel.value)
    );

    const uniqueDates = [...new Set(messageCountList.map((msg) => msg.timeBucket))];

    const seriesData = filteredChannels.map((channel) => {
      const data = uniqueDates.map((date) => {
        const count = messageCountList
          .filter((msg) => msg.channelId === channel.value && msg.timeBucket === date)
          .reduce((total, msg) => total + parseInt(msg.count), 0);
        return [new Date(date).getTime(), count];
      });

      return {
        name: channel.name,
        data,
      };
    });

    return {
      title: {
        text: "Engagement Messages Over Time",
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          day: "%e. %b",
          week: "%e. %b",
          month: "%b '%y",
        },
        tickInterval: 24 * 3600 * 1000, 
      },
      yAxis: {
        title: {
          text: "Message Count",
        },
      },
      legend: {
        enabled: true,
      },
      tooltip: {
        formatter: function () {
          return (
            "<b>" +
            Highcharts.dateFormat("%b %e, %Y", this.x) +
            "</b><br/>" +
            this.series.name +
            ": " +
            this.y
          );
        },
      },
      series: seriesData,
    };
  },
}