
var schoolData = [];

d3.csv('kenyaschools.csv', function(data){

    d3.select('body').selectAll('svg').selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr({
        'r': '2',
        'cy': function(data){
          // kenya y top - 5
          // kenya y bottom - 4.6
          var geoLococation = data['Geolocation'].split(', ')
          var yGeolocation = geoLococation[0].slice(1, geoLococation[0].length - 1);
          return 625 + (-1 * (120 * yGeolocation));
        },
        'cx': function(data){
          // kenya x left - 34
          // kenya x right - 41.9
          var geoLococation = data['Geolocation'].split(', ')
          var xGeolocation = geoLococation[1].slice(0, geoLococation[1].length - 2)
          return (100 * xGeolocation) - 3200 ;
        },
        'fill': function(data){
          var toiletCount = parseInt(data['Boys Toilets']) + parseInt(data['Girls Toilets']) + parseInt(data['Teachers Toilets']);
          console.log(toiletCount);
          if( toiletCount > 20 ){
            return "#660300"
          }
          if( toiletCount > 15 ){
            return '#A50904';
          }
          if( toiletCount > 10 ){
            return '#E50700';
          }
          if( toiletCount > 5 ){
            return '#FF2A23';
          }
          return '#FF645F';
        }
      })
    });

var colorLegend = [
  { fill: '#660300', text: '> 20' },
  { fill: '#A50904', text: '20-15' },
  { fill: '#E50700', text: '15-10' },
  { fill: '#FF2A23', text: '10-5' },
  { fill: '#FF645F', text: '< 5' }
]

d3.select('body').selectAll('span')
      .data(colorLegend)
      .enter()
      .append('div')
      .text(function(data){
        return data.text;
      })
      .style({
        'background-color': function(data){
          return data.fill;
        }
      })
