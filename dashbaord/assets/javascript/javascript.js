// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  
  // Get the calendar days container
  const calendarDaysContainer = document.getElementById('calendarDays');

  // Only run the script if the calendarDaysContainer exists
  if (calendarDaysContainer) {
    
    // Example data for October 2024 (starting on a Tuesday, with 31 days)
    const daysInMonth = 31;
    const firstDayOfWeek = 2; // 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.

    // Generate empty days for the start of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.classList.add('calendar-day', 'empty');
      calendarDaysContainer.appendChild(emptyDay);
    }

    // Generate the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('calendar-day');
      dayDiv.setAttribute('data-day', day);
      dayDiv.textContent = day; // Add the day number to the div
      calendarDaysContainer.appendChild(dayDiv);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Toggle the subtask input form visibility
  function toggleSubTaskForm(formId) {
    const subTaskForm = document.getElementById(formId);
    
    // Check if the form exists before toggling visibility
    if (subTaskForm) {
      subTaskForm.classList.toggle('d-none');
    }
  }

  // Add subtask function
  function addSubTask(inputId, containerId, colorClass) {
    const subTaskInput = document.getElementById(inputId);
    const subTaskContainer = document.getElementById(containerId);

    // Ensure both the input field and container exist
    if (subTaskInput && subTaskContainer) {
      const taskName = subTaskInput.value.trim(); // Get the task name

      // Only proceed if the input is not empty
      if (taskName !== '') {
        // Create the subtask element
        const newSubTask = document.createElement('div');
        newSubTask.classList.add('subtask-item');
        newSubTask.innerHTML = `
          <div class="mb-3 success-box bg-${colorClass} bg-opacity-25 p-2 rounded-3 d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
              <p class="mb-0 fw-bold text-${colorClass} small">${taskName}</p>
            </div>
          </div>
        `;

        // Append the new subtask to the container
        subTaskContainer.appendChild(newSubTask);

        // Clear the input field and hide the subtask form
        subTaskInput.value = '';
        subTaskContainer.classList.remove('d-none');
      }
    }
  }

  // Attach event listeners to toggle subtask forms
  const toggleLinks = document.querySelectorAll('.add-subtask');

  if (toggleLinks.length > 0) {
    toggleLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const formId = this.getAttribute('data-form-id');
        toggleSubTaskForm(formId);
      });
    });
  }

  // Attach event listeners to all buttons with class 'add-subtask-btn'
  const addButtons = document.querySelectorAll('.add-subtask-btn');

  if (addButtons.length > 0) {
    addButtons.forEach(button => {
      button.addEventListener('click', function () {
        const inputId = this.getAttribute('data-input-id');
        const containerId = this.getAttribute('data-container-id');
        const colorClass = this.getAttribute('data-color');

        // Call addSubTask when button is clicked
        addSubTask(inputId, containerId, colorClass);
      });
    });
  }
});

const toggleBtn = document.getElementById('toggleBtn');
const closeBtn = document.getElementById('closeBtn');
const navbar = document.getElementById('navbar');
const mainContent = document.querySelector('.main-content');

toggleBtn.addEventListener('click', function() {
    navbar.classList.toggle('show');
    navbar.classList.toggle('hide');

    toggleBtn.classList.toggle('nav-hidden'); // Adjust toggle button position when navbar is hidden

    // Adjust main content margin only in desktop view
    if (window.innerWidth > 768) {
        if (navbar.classList.contains('hide')) {
            mainContent.style.marginLeft = '0';
        } else {
            mainContent.style.marginLeft = '250px';
        }
    }
});

// Close button functionality
closeBtn.addEventListener('click', function() {
    navbar.classList.add('hide');
    navbar.classList.remove('show');

    toggleBtn.classList.add('nav-hidden'); // Adjust toggle button position when navbar is hidden

    // Adjust main content margin only in desktop view
    if (window.innerWidth > 768) {
        mainContent.style.marginLeft = '0';
    }
});

// Adjust margin-left dynamically when resizing the window
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        mainContent.style.marginLeft = '0';
        toggleBtn.style.left = '10px'; // Adjust toggle button position for mobile
    } else {
        mainContent.style.marginLeft = navbar.classList.contains('hide') ? '0' : '250px';
        toggleBtn.style.left = navbar.classList.contains('hide') ? '10px' : '260px'; // Adjust toggle button position for desktop
    }
});
// sidebar-dropdown


// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  
  // Get the elements
  const imageInput = document.getElementById('imageInput');
  const uploadBtn = document.getElementById('uploadBtn');
  const preview = document.getElementById('preview');

  // Only run the script if the necessary elements exist
  if (imageInput && uploadBtn && preview) {
    
    // When the custom button is clicked, trigger the hidden file input
    uploadBtn.addEventListener('click', function() {
      imageInput.click();
    });

    // When the file input changes, show the preview of the selected images
    imageInput.addEventListener('change', function() {
      // Clear the preview container
      preview.innerHTML = '';

      const files = imageInput.files;

      if (files.length === 0) {
        preview.innerHTML = '<p>No images selected</p>';
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith('image/')) {
          continue;
        }

        const imagePreviewDiv = document.createElement('div');
        imagePreviewDiv.classList.add('image-preview');

        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.onload = function() {
          URL.revokeObjectURL(img.src); // Free memory after loading
        };

        const closeButton = document.createElement('button');
        closeButton.classList.add('close-btn');
        closeButton.innerHTML = '&times;'; // Cross (×) symbol for the close button

        closeButton.addEventListener('click', function() {
          imagePreviewDiv.remove();
        });

        imagePreviewDiv.appendChild(img);
        imagePreviewDiv.appendChild(closeButton);
        preview.appendChild(imagePreviewDiv);
      }
    });
  }
});



// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  
  // Check if the #chart element exists before rendering the area chart
  const chartElement = document.querySelector("#chart");
  if (chartElement) {
    var areaOptions = {
      series: [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    };
    
    var areaChart = new ApexCharts(chartElement, areaOptions);
    areaChart.render();
  }

  // Check if the #donutchart element exists before rendering the donut chart
  const donutChartElement = document.querySelector("#donutchart");
  if (donutChartElement) {
    var donutOptions = {
      series: [44, 55, 41, 17, 15],
      chart: {
        type: 'donut'
      },
      labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'], // Labels are required but will be hidden
      dataLabels: {
        enabled: false // Hides data labels from the chart itself
      },
      legend: {
        show: false // Hides the legend
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          }
        }
      }]
    };
    
    var donutChart = new ApexCharts(donutChartElement, donutOptions);
    donutChart.render();
  }
});



document.addEventListener('DOMContentLoaded', function () {
  const chatFilesBtn = document.querySelector('.chat-files-btn');
  const chatAttachments = document.querySelector('.chatattachments');
  const modalAttachmentsContent = document.getElementById('modal-attachments-content');

  chatFilesBtn.addEventListener('click', function () {
    if (window.innerWidth <= 991) { // Check if the viewport is mobile size
      // Clear previous content in modal
      modalAttachmentsContent.innerHTML = '';
      // Move chatattachments content into the modal
      modalAttachmentsContent.appendChild(chatAttachments.cloneNode(true));
      // Show modal
      const attachmentsModal = new bootstrap.Modal(document.getElementById('attachmentsModal'));
      attachmentsModal.show();
    }
  });
});