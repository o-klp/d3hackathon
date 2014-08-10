
var schoolData = [];

d3.csv('kenyaschools.csv', function(data){

    d3.select('body').selectAll('svg').selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr({
        'r': '2',
        'cy': function(data){
          var geoLococation = data['Geolocation'].split(', ')
          var yGeolocation = geoLococation[0].slice(1, geoLococation[0].length - 1);
          var yMissPlacement = 647 + (-1 * (120 * yGeolocation));

          var yDistance = Math.abs(662.80964 - yMissPlacement);
          if( yMissPlacement <= 662.80964 ){
            var yPlacement = yMissPlacement + (yDistance * 0.0608977244)
          }else{
            var yPlacement = yMissPlacement - (yDistance * 0.0718977244)
          }
          return yPlacement;
        },
        'cx': function(data){
          var geoLococation = data['Geolocation'].split(', ')
          var xGeolocation = geoLococation[1].slice(0, geoLococation[1].length - 2)
          var xMissPlacement = (100 * xGeolocation) - 3172;
          var xDistance = Math.abs(563.11 - xMissPlacement);
          if( xMissPlacement <= 563.11 ){
            var xPlacement = xMissPlacement - (xDistance * 0.1308977244)
          }else{
            var xPlacement = xMissPlacement + (xDistance * 0.1158977244)
          }
          return xPlacement;
        },
        'fill': function(data){
          var toiletCount = parseInt(data['Boys Toilets']) + parseInt(data['Girls Toilets']) + parseInt(data['Teachers Toilets']);
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
