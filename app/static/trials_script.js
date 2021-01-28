var timeout;

function $(id) {
    return document.getElementById(id);
};

var bins = document.getElementsByClassName("bin");
dragArr = [$("staging")]
for (i = 0; i < bins.length; i++) {
    dragArr[i + 1] = $(bins[i].id);
}
var drake = dragula(dragArr, {
    invalid: function(el, handle) {
        if (el.classList.contains('prev-card')) {
            return (true);
        } else {
            return (false);
        };
    },
}).on("drop", function(el) {
    var chosen_bin = document.getElementById("chosen_bin");
    chosen_bin.value = el.parentElement.id;
    console.log("Moved to " + el.parentElement.id);
});

// dragula(containers, {
//     isContainer: function(el) {
//         return false; // only elements in drake.containers will be taken into account
//     },
//     moves: function(el, source, handle, sibling) {
//         return true; // elements are always draggable by default
//     },
//     accepts: function(el, target, source, sibling) {
//         return true; // elements can be dropped in any of the `containers` by default
//     },
//     invalid: function(el, handle) {
//         return false; // don't prevent any drags from initiating by default
//     },
//     direction: 'vertical', // Y axis is considered when determining where an element would be dropped
//     copy: false, // elements are moved by default, not copied
//     copySortSource: false, // elements in copy-source containers can be reordered
//     revertOnSpill: false, // spilling will put the element back where it was dragged from, if this is true
//     removeOnSpill: false, // spilling will `.remove` the element, if this is true
//     mirrorContainer: document.body, // set the element that gets mirror elements appended
//     ignoreInputTextSelection: true, // allows users to select input text, see details below
//     slideFactorX: 0, // allows users to select the amount of movement on the X axis before it is considered a drag instead of a click
//     slideFactorY: 0, // allows users to select the amount of movement on the Y axis before it is considered a drag instead of a click
// });

var submit_trial_btn = document.getElementById("submit_trial");
submit_trial_btn.disabled = true;

function showFeedback() {
    var feedback_box = document.getElementById("feedback_text");
    var chosen_bin = document.getElementById("chosen_bin").value;
    var submit_choice_btn = document.getElementById("submit_choice_btn");
    var submit_trial_btn = document.getElementById("submit_trial");
    // var feedback_type = document.getElementById("feedback_type").innerHTML;
    // console.log(feedback_type);

    if (chosen_bin == "staging" || chosen_bin == "") {
        feedback_box.innerHTML = "Please choose a bin for the card!";
    } else {
        // if (feedback_type == "text" || feedback_type == "both") {
        //     feedback_box.innerHTML = $("bin_text_feedback" + chosen_bin[3]).innerHTML + " Go to the next trial.";
        // }
        // if (feedback_type == "nonverbal" || feedback_type == "both") {
        //     var nonverbal = $("bin_nonverbal_feedback" + chosen_bin[3]).innerHTML.split(";");
        //     var images = []
        //     for (i = 0; i < nonverbal.length - 1; i++) {
        //         images.push(nonverbal[i]);
        //     }
        //     var interval = parseInt(nonverbal[nonverbal.length - 1])

        //     looper(images, interval, "robot");
        // }
        // if (feedback_type == "none") {
        //     feedback_box.innerHTML = "Go to the next trial.";
        // }
        submit_choice_btn.disabled = true;
        submit_trial_btn.disabled = false;
        drake.destroy();
    }
}

function looper(images, interval, image_id) {
    current_image = document.getElementById(image_id).src;
    timeout = setTimeout(function() {
        if (images.length == 2) {
            if (current_image == images[0]) {
                document.getElementById(image_id).src = images[1];
                looper(images, interval, image_id);
            } else {
                document.getElementById(image_id).src = images[0];
                looper(images, interval, image_id);
            }
        }

    }, interval);

}

document.getElementById("submit_trial").onclick = function() {
    clearTimeout(timeout);
}