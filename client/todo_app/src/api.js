const BASE_URL = 'http://localhost:5000/api';

export const createTaskAPI = async (task) => {
    try{
        const response = await fetch(`${BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
    
        return await response.json();
    }catch(e) {
        console.log(e);
    }
}

export const listTasks = async () => {
    const response = await fetch(`${BASE_URL}/tasks`);
    return await response.json();
}

export const editTask = async (task) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
  
      return await response.json();

    } catch (e) {
      console.error(e);
    }
  };

  export const deleteTask = async (task) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
  
      return await response.json();

    } catch (e) {
      console.error(e);
    }
  };
  