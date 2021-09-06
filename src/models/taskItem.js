class TaskItem {
    constructor() {
        this.id = null; // identificador
        this.createAt = null; // formato: "2021-02-12T15:32:22.000+00:00"
        this.title = ''; // titulo de la tarea
        this.description = ''; // descripción de la tarea
        this.done = false; // estado de vigencia de la tarea
    }
}

export default TaskItem;
