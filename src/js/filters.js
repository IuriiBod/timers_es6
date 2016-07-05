/*let moduleName='timer.filters';

angular.module(moduleName, [])
  .filter('timerFilter', () => {
		return (ms) => {
			if (ms < 0) {
				return '--:--';
			}

			let d, h, m, s, arr = [], arrDate = [];
			s = Math.floor(ms / 1000);
			m = Math.floor(s / 60);
			s = s % 60;
			h = Math.floor(m / 60);
			m = m % 60;
			d = Math.floor(h / 24);
			h = h % 24;

			arr.push(d,h,m,s);

			arrDate = arr.map(item => item > 9 ? item : ('0' + item) );

			return arrDate.join(':');
		}
	});
	
export default moduleName;
*/

let moduleName='timer.filters';

class TimerFilter{
  constructor(ms){
		this.ms = ms;
	}
	
	parseMs() {
		let ms = this.ms;
		
		if (ms < 0) {
			return '--:--';
		}

		let d, h, m, s, arr = [], arrDate = [];
		s = Math.floor(ms / 1000);
		m = Math.floor(s / 60);
		s = s % 60;
		h = Math.floor(m / 60);
		m = m % 60;
		d = Math.floor(h / 24);
		h = h % 24;

		arr.push(d,h,m,s);

		arrDate = arr.map(item => item > 9 ? item : ('0' + item) );

		return arrDate.join(':');
	}
	
	static TimerFilterFactory(ms){
		let filter = new TimerFilter(ms);
		return filter.parseMs();
  }
}

TimerFilter.TimerFilterFactory.$inject = ['ms'];

angular.module(moduleName, [])
  .filter('timerFilter', () => TimerFilter.TimerFilterFactory);

export default moduleName;