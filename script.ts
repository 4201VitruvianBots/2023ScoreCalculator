const inputs = Object.fromEntries([
    'auto_low', 'auto_mid', 'auto_high',
    'all_low', 'all_mid', 'all_high',
    'supercharged', 'links',
    'auto_balance', 'auto_dock', 'mobility',
    'end_balance', 'end_dock', 'parked'
].map(e => [e, <HTMLInputElement>document.getElementById(e)!]));

const outputs = Object.fromEntries([
    'mobility', 'grid', 'station', 'park', 'total'
].map(e => [e, <HTMLInputElement>document.getElementById(e + '_score')!]));

const resetButton = document.getElementById('reset')!;

const updateScore = () => {
    const scores = Object.fromEntries(
        Object.entries(inputs)
            .map(([k,v]) => [k, parseInt(v.value)])
    );

    const mobility_score =
       3 * scores.mobility;

    const grid_score =
       3 * scores.auto_low +
       4 * scores.auto_mid +
       6 * scores.auto_high +
       2 * Math.min(0, scores.all_low - scores.auto_low) +
       3 * Math.min(0, scores.all_mid - scores.auto_mid) +
       5 * Math.min(0, scores.all_high - scores.auto_high) +
       3 * scores.supercharged +
       5 * scores.links;

    const station_score =
       6 * scores.end_dock +
       10 * scores.end_balance +
       8 * scores.auto_dock +
       12 * scores.auto_balance;

    const park_score =
       2 * scores.parked;

    const total_score = mobility_score + grid_score + station_score + park_score;

    outputs.mobility.innerText = mobility_score.toString();
    outputs.grid.innerText = grid_score.toString();
    outputs.station.innerText = station_score.toString();
    outputs.park.innerText = park_score.toString();
    outputs.total.innerText = total_score.toString();
}

const resetAll= () => {
    Object.values(inputs).forEach(e => e.value = '0');
    updateScore();
}

//const matchIfEqual = (target: HTMLInputElement) => (
//    (event: Event) => {
//        if ((event.target! as HTMLInputElement).value == target.value) {
//            target.value = (event.target! as HTMLInputElement).value;
//        }
//    }
//);
//
//[
//    [inputs.auto_high, inputs.all_high],
//    [inputs.auto_mid, inputs.all_mid],
//    [inputs.auto_low, inputs.all_low]
//].forEach(([auto, all]) => auto.addEventListener('input', matchIfEqual(all)));

Object.values(inputs).forEach(e => e.addEventListener('input', updateScore));


resetButton.addEventListener('click', resetAll);

updateScore();
