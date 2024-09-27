$(document).ready(function() {

    //fungsi untuk task/ tugas baru
    function addTask() {
        const taskList = $("#taskList");
        const newTask = $("#newTask").val();

        if (newTask !== "") {
            const li = $("<li></li>").addClass("task-item").attr("data-status", "pending");

            //fungsi menandai task (coret)
            const checkbox = $("<input>")
                .attr("type", "checkbox")
                .addClass("task-checkbox")
                .on("click", function () {
                    if ($(this).is(":checked")) {
                        $(li).find(".task-text").addClass("completed");
                        $(li).attr("data-status", "done");
                    } else {
                        $(li).find(".task-text").removeClass("completed");
                        $(li).attr("data-status", "pending");
                    }
                });

            const taskText = $("<span></span>")
                .addClass("task-text")
                .text(newTask);

            //fitur delete task (button akan muncul ketika hover)
            const deleteButton = $("<button></button>")
                .addClass("delete-task")
                .html('<i class="fa fa-trash"></i>')
                .on("click", function () {
                    li.remove();
                });

            //penambahan <li> ketika ada task baru
            li.append(checkbox, taskText, deleteButton);
            taskList.append(li);

            $("#newTask").val(""); 
        }
    }

    //fungsi untuk filter (aktif/pending/all)
    function filterTasks(filter) {
        $("#taskList li").each(function () {
            const taskStatus = $(this).attr("data-status");
            if (filter === "done") {
                $(this).css("display", taskStatus === "done" ? "flex" : "none");
            } else if (filter === "pending") {
                $(this).css("display", taskStatus === "pending" ? "flex" : "none");
            } else {
                $(this).css("display", "flex");
            }
        });
    }

    window.searchTasks = function(event) {
        const searchTerm = $("#searchInput").val().toLowerCase();
        $("#taskList li").each(function () {
            const taskText = $(this).find(".task-text").text().toLowerCase();
            if (taskText.includes(searchTerm)) {
                $(this).css("display", "flex");
            } else {
                $(this).css("display", "none");
            }
        });
    };

    window.triggerAddTask = function(event) {
        if (event.key === " ") {
            addTask();
        }
    };

    window.addTask = addTask;
    
    window.filterTasks = filterTasks;
});
