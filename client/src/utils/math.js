export function determineHeight(htInInches){
  const feet = Math.floor(htInInches / 12)
  const inches = htInInches % 12
  return(`${feet}'${inches}"`)
}


export function determineAge(birthdayStr){
  // Parse the birthday string into a Date object with explicit time
  const [year, month, day] = birthdayStr.split('-').map(Number);
  const birthDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0)); // Using UTC to avoid time zone issues

  if (isNaN(birthDate.getTime())) {
    throw new Error("Invalid date format. Must be 'YYYY-MM-DD'");
  }

  // Get today's date and set it to noon to avoid time zone issues
  const today = new Date();
  today.setUTCHours(12, 0, 0, 0); // Using UTC to avoid time zone issues

  // Calculate age in years
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
  if (age < 0){
    throw new Error("Invalid date. Date entered must be from the past.")
  }
  
  // Check if birthday hasn't happened yet this year
  const monthDiff = today.getUTCMonth() - birthDate.getUTCMonth();
  const dayDiff = today.getUTCDate() - birthDate.getUTCDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)){
    age--;
  }

  return age;
}


export function calculatePROD(points, avgtoi, gamesPlayed) {
  // Split the avgtoi string into minutes and seconds
  const [minutes, seconds] = avgtoi.split(':').map(Number);

  // Convert the time on ice to hours
  const timeInSeconds = gamesPlayed * ((minutes * 60) + seconds)
  const prodMins = Math.floor((timeInSeconds / points)/60)
  const prodSecs = Math.round(((timeInSeconds / points)%60).toFixed(2))

  // Calculate PROD
  const PROD = `${prodMins}:${prodSecs}`;
  return PROD;
}