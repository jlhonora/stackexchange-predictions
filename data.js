if (window.File && window.FileReader && window.FileList && window.Blob) {
  // All OK!
} else {
  alert('The File APIs are not fully supported by your browser.');
}

var camelCaseToWords = function(str) {
    var out = str.replace(/^\s*/, "");  // strip leading spaces
    out = out.replace(/^[a-z]|[^\s][A-Z]/g, function(str, offset) {
        if (offset == 0) {
            return(str.toUpperCase());
        } else {
            return(str.substr(0,1) + " " + str.substr(1).toUpperCase());
        }
    });
    return(out);
};

var processInput = function(content) {
  var data = JSON.parse(content);
  var colors = ["#2484c1", "#4daa4b", "#0c6197", "#90c469", "#daca61", "#e4a14b", "#e98125", "#cb2121", "#830909", "#923e99", "#ae83d5", "#bf273e", "#ce2aeb", "#bca44a", "#618d1b", "#1ee67b", "#b0ec44", "#a4a0c9", "#322849", "#86f71a", "#d1c87f", "#7d9058", "#44b9b0", "#7c37c0", "#cc9fb1", "#e65414", "#8b6834", "#248838", "#adadad"];
  var colors_length = colors.length;
  var categories = ["TechStacks", "MajorDeveloperKinds"]
  $.each(data["Data"]["MajorDeveloperKinds"], function(key, val) {
    categories.push("Minor" + key + "DeveloperKinds");
  });
  $.each(categories, function(category_index, category) {
    $('#charts').append('<div class="col-md-6" id="pieChart' + category + '"></div>');
    var content = [];
    var i = 0;
    $.each(data["Data"][category], function(key, val) {
      if (val == 0) {
        return;
      }
      content.push(
      {
        "label": camelCaseToWords(key),
        "value": val,
        "color": colors[i % colors_length]
      });
      i++;
    });
    var pie = new d3pie("pieChart" + category, {
      "header": {
        "title": {
          "text": camelCaseToWords(category),
          "fontSize": 24
        },
        "titleSubtitlePadding": 9
      },
      "footer": {
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
      },
      "size": {
        "canvasWidth": 590,
        "pieInnerRadius": "50%",
        "pieOuterRadius": "71%"
      },
      "data": {
        "sortOrder": "value-desc",
        "content": content,
      },
      "labels": {
        "outer": {
          "pieDistance": 32
        },
        "inner": {
          "hideWhenLessThanPercentage": 3
        },
        "mainLabel": {
          "fontSize": 11
        },
        "percentage": {
          "color": "#ffffff",
          "decimalPlaces": 0
        },
        "value": {
          "color": "#adadad",
          "fontSize": 11
        },
        "lines": {
          "enabled": true
        }
      },
      "effects": {
        "load": {
          "speed": 0
        },
        "pullOutSegmentOnClick": {
          "effect": "none",
          "speed": 400,
          "size": 8
        },
        "highlightSegmentOnMouseover": false,
        "highlightLuminosity": -0.5
      },
      "misc": {
        "gradient": {
          "enabled": true,
          "percentage": 100
        }
      }
    });
  });
};

function readSingleFile(evt) {
  // Retrieve the first (and only!) File from the FileList object
  var f = evt.target.files[0];

  if (f) {
    var r = new FileReader();
    r.onload = function(e) {
      processInput(e.target.result);
    }
    r.readAsText(f);
  } else {
    alert("Failed to load file");
  }
}

document.getElementById('fileInput').addEventListener('change', readSingleFile, false);

