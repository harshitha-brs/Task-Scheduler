// script.js
document.getElementById("submit").addEventListener("click", function() {
  const tasksInput = document.getElementById("tasksInput").value;
  const cooldownInput = document.getElementById("cooldownInput").value;

  try {
    const tasks = JSON.parse(tasksInput.trim().replace(/'/g, '"'));
    const cooldownTime = parseInt(cooldownInput.trim());

    const result = leastInterval(tasks, cooldownTime);

    document.getElementById("output").innerHTML = "<b>Output:</b> " + result;
  } catch (error) {
    document.getElementById("output").innerHTML = "<b>Error</b>";
  }
});

var leastInterval = function(tasks, n) {
  let freq = new Array(26).fill(0);
  for (let task of tasks) {
    let idx = task.charCodeAt(0) - "A".charCodeAt(0);
    freq[idx]++;
  }

  freq.sort((a, b) => b - a);

  let maxFreq = freq[0];
  let idleSlots = (maxFreq - 1) * n;

  for (let i = 1; i < freq.length && idleSlots > 0; i++) {
    idleSlots -= Math.min(freq[i], maxFreq - 1);
  }

  idleSlots = Math.max(0, idleSlots);

  return tasks.length + idleSlots;
};
