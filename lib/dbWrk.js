// Database work functions for the game server
// These are mock implementations - replace with actual database operations

let gameRounds = [];
let history = [];
let roundIdCounter = 1;

export async function saveGameRound(roundData) {
  try {
    const roundId = roundIdCounter++;
    const newRound = {
      id: roundId,
      ...roundData,
      createdAt: new Date()
    };

    gameRounds.push(newRound);

    return {
      success: true,
      roundId: roundId,
      message: 'Round saved successfully'
    };
  } catch (error) {
    console.error('Error saving game round:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function updateGameRound(roundId, updateData) {
  try {
    const roundIndex = gameRounds.findIndex(round => round.id === roundId);

    if (roundIndex === -1) {
      return {
        success: false,
        error: 'Round not found'
      };
    }

    gameRounds[roundIndex] = {
      ...gameRounds[roundIndex],
      ...updateData,
      updatedAt: new Date()
    };

    return {
      success: true,
      message: 'Round updated successfully'
    };
  } catch (error) {
    console.error('Error updating game round:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function getCurrentGameRound() {
  try {
    // Get the most recent active round
    const activeRound = gameRounds
      .filter(round => round.status === 'active')
      .sort((a, b) => b.createdAt - a.createdAt)[0];

    if (activeRound) {
      return {
        success: true,
        round: activeRound
      };
    }

    return {
      success: true,
      round: null,
      message: 'No active round found'
    };
  } catch (error) {
    console.error('Error getting current game round:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function insertHistory(historyData) {
  try {
    const historyEntry = {
      id: Date.now(),
      ...historyData,
      timestamp: new Date()
    };

    history.push(historyEntry);

    return {
      success: true,
      message: 'History entry inserted successfully'
    };
  } catch (error) {
    console.error('Error inserting history:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Helper functions for debugging/testing
export function getAllRounds() {
  return gameRounds;
}

export function getAllHistory() {
  return history;
}

export function clearData() {
  gameRounds = [];
  history = [];
  roundIdCounter = 1;
}
