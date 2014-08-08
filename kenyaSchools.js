
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
          return (100 * xGeolocation) - 3000 ;
        },
        'fill': function(data){
          // if(  )
          var size = data['Total Enrolment'];
          if( size > 1000 ){
            return "#0B4C66"
          }
          if( size > 750 ){
            return '#295466';
          }
          if( size > 500 ){
            return '#1384B2';
          }
          if( size > 250 ){
            return '#18AAE5';
          }
          return '#67D3FF';
        }
      })
    });

var colorLegend = [
  {fill: '#0B4C66', text: '> 1000' },
  {fill: '#295466', text: '1000-750' },
  {fill: '#1384B2', text: '750-500' },
  {fill: '#18AAE5', text: '500-250' },
  {fill: '#67D3FF', text: '< 250' }
]

d3.select('body').selectAll('div')
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
