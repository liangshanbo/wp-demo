/**
 * @author Hao Sun
 * @date 20160602
 * @fileoverview 打Tag系统
 */

$(function() {
  sockjsClient.init();
  var sysType = $('#mySysType').val();
  var defaultProject = "app";
  var url = '';
  if (sysType === 'svn') {
    url = "/tags?type=";
  }else if (sysType === 'gitlab') {
    url = "/gitTags?type=";
  }
  var api = {
    ajaxTags: function(options) {
      var _default = {
        type: defaultProject,
        callback: function() {},
        errcallback: function() {}
      };
      $.extend(_default, options);
      $.ajax({
        url: url + _default.type,
        type: "GET",
        success: function(data) {
          _default.callback(data);
        },
        error: function() {
          _default.errcallback();
        }
      });
    }
  };


  /*回滚*/
  const numOfCols = 6;
  var $projects_sele = $("#rollback .projects"),
    $versions_sele = $("#rollback .version .versions"),
    $version = $("#version");
  $projects_sele.on("change", function() {
    var type = $(this).val().trim();
    api.ajaxTags({
      type: type,
      callback: function(data) {

        if (sysType === 'svn') {
          var str = ' <thead><tr class="head"> ' +
              '<th>序号</th> <th>时间</th> <th>版本</th> <th>用户</th> <th width="30%">注释</th> <th>操作</th> ' +
              '</tr> </thead><tbody id="myTable">';

          for (var j = 0, l = data.length; j < l; j++) {
            str += "<tr class='child'>";
            var datas = data[j].split("--");

            datas.push('<form action="/rmtags" method="post" target="panel" id="rmtags" class="hiddenForm">' +
                '<input type="submit" class="btn btn-warning" data-toggle="modal" data-target="#myModal" value="删除">' +
                '<input type="hidden" name="target" value="' + type + '">' +
                '<input type="hidden" name="tags" value="' + data[j] + '">' +
                '</form>' +
                '<form action="/rollback" method="post" target="panel" id="rollback" class="hiddenForm">' +
                '<input type="submit" class="btn btn-success" value="回滚" data-toggle="modal" data-target="#myModal">' +
                '<input type="hidden" name="target" value="' + type + '">' +
                '<input type="hidden" name="p" value="' + data[j] + '">' +
                '</form>');
            //console.log(datas)
            datas.unshift(j + 1);

            for (var i = 0; i < numOfCols; i++) {
              if (datas.length < numOfCols) {
                datas.splice(2, 0, "");
              }
            }

            var times = datas[1];
            times = times.substring(0, 4) + "/" + times.substring(4, 6) + "/" + times.substring(6, 8) + " " + times.substring(8, 10) + ":" + times.substring(10, 12);
            datas[1] = times;


            for (var i = 0; i < datas.length; i++) {
              str += "<td>" + datas[i] + "</td>";
            }


            str += "</tr>";
          }
          str += '</tbody>';


          $version.html(str);
        }else {
          template.helper('dateFormat', function (date, format) {
            return moment(date).format(format);
          });
          var html = template('test', data);
          document.getElementById('version').innerHTML = html;
        }
        //console.log($version.html())
        $('#myPager').html('');
        $(document).ready(function() {
          $('#myTable').pageMe({
            pageLength: 3,
            numPages: 1,
            pagerSelector: '#myPager',
            showPrevNext: true,
            hidePageNumbers: true,
            perPage: 15
          });
        });
      },

      errcallback: function() {
        $version.html("");
      }

    });

  });
  $projects_sele.trigger("change");

  /*删除tags*/
  var $rmtags = $("#rmtags"),
    $rmUl = $rmtags.find("ul");
  $rmtags.find(".projects").on("change", function() {
    var type = $(this).val().trim();
    api.ajaxTags({
      type: type,
      callback: function(data) {
        var str = "";
        for (var i = 0, l = data.length; i < l; i++) {
          var item = data[i];
          str += "<li><label>" + item + "</label><input type='checkbox' value='" + item + "' name='tags'/></li>"
        }
        $rmUl.html(str);
      },
      errcallback: function() {
        $rmUl.empty();
      }
    });
  });

  (function() {
    api.ajaxTags({
      type: defaultProject,
      callback: function(data) {
        var str = "";
        for (var i = 0, l = data.length; i < l; i++) {
          var item = data[i];
          str += "<li><label>" + item + "</label><input type='checkbox' value='" + item + "' name='tags'/></li>"
        }
        $rmUl.html(str);
        var str2 = "";
        for (var i = 0, l = data.length; i < l; i++) {
          str2 += "<option value='" + data[i] + "'>" + data[i] + "</option>"
        }
        $versions_sele.html(str2);
      },
      errcallback: function() {
        $rmUl.empty();
      }
    });
  })();

  //$rmtags.find(".projects").trigger("change");
  $rmtags.find(".refresh").on("click", function() { //刷新
    $rmtags.find(".projects").trigger("change");
  });

  var body = $("#iframe").contents().find("body");
  $("#iframe").load(function() {
    //console.log(213)
    body.css({
      'font-family': 'Lucida Console, Microsoft YaHei',
      'color': '#fff',
      'font-size': '22px',
      'margin': '0px'
    });
    //console.log(body)
  });
  function openLog(){
    //$('#operateLogs').trigger('click');
    $('#myModal').modal('show');
    $('#operateProjects').trigger('change');
  };


  $('#saveDev').click(function(){
    $.ajax({
      url: "/gitHitTag",
      type: "POST",
      data: {
        projectId: $('#selSaveDev').val(),
        projectName: $('#selSaveDev').find("option:selected").text()
      },
      success: function(data) {
        if (data === "success") {
          openLog();
        }else {
          alert(data);
        }
      },
      error: function() {
        alert('error');
      }
    });
  });
  $('#version').on('click', '.gitDelete', function(e){
    $.ajax({
      url: "/gitRmtags",
      type: "POST",
      data: {
        projectId: $('#operateProjects').val(),
        branchName: $(e.target).attr('branchName'),
        projectName: $('#operateProjects').find("option:selected").text()
      },
      success: function(data) {
        if (data === "success") {
          openLog();
        }else {
          alert("fail,请联系管理员!");
        }
      },
      error: function() {
        alert('error');
      }
    });
  });
  $('#version').on('click', '.gitRollback', function(e){
    $.ajax({
      url: "/gitRollback",
      type: "POST",
      data: {
        projectId: $('#operateProjects').val(),
        branchName: $(e.target).attr('branchName'),
        projectName: $('#operateProjects').find("option:selected").text()
      },
      success: function(data) {
        if (data === "success") {
          openLog();
        }else {
          alert("fail,请联系管理员!");
        }
      },
      error: function() {
        alert('error');
      }
    });
  });

  $('#cleanTagsBtn').click(function(){
    $.ajax({
      url: "/gitCleantags",
      type: "POST",
      data: {
        projectId: $('#operateProjects').val(),
        projectName: $('#operateProjects').find("option:selected").text()
      },
      success: function(data) {
        if (data === "success") {
          openLog();
        }else {
          alert("fail,请联系管理员!");
        }
      },
      error: function() {
        alert('error');
      }
    });
  });
});
