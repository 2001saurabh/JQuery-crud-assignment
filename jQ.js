$(document).ready(
   
    function(){

        let StudentDetails = $('#student-data-table tbody');
        let url ='http://localhost:3500/students'


         // fetch all existing students 
        function loadStudentDetails(){
           console.log( $('button#submit').hasClass('enabled'))


            $.ajax({
                url: url,
                type:'GET',
                success:function(res){
                    console.log("loading all students")
                        $.each(res, function(index, student){
                            let tableRow = $(`
                            <tr class ='center aligned'>
                                <td>${student.id}</td>
                                <td>${student.name}</td>
                                <td>${student.email}</td>
                                <td>
                                    <button class="ui teal button" id="editStudent" data-id="${student.id}">Edit</button>
                                    <button class="ui red button" id="deleteStudent" data-id="${student.id}">Delete</button>
                                </td>
                            </tr>
                            `)
    
                            StudentDetails.append(tableRow)
                        // StudentDetails.append("<tr class='center aligned'><td>"+ student.id +"</td><td>" + student.name +"</td><td>" + student.email+ '</td><td><button  id="editStudent" class="ui teal button" data-id="' + student.id + '">Edit</button> <button id="deleteStudent" class="ui red button" data-id="' + student.id + '">Delete</button></td></tr>' )
                    })
                }})
        }

        loadStudentDetails()
         // this is how we have to bind the event as it might happen that we have some element not visible to dom
        // so we need to bind them with body, untill body have such selectors then we can perform the delete operation 
        function deleteStudentDetails(){
            $('body').on("click", "button#deleteStudent", function(){
              
                let studentId= $(this).data('id');
                console.log(studentId);

                $.ajax({
                    url:url+`/${studentId}`,
                    type:'DELETE',
                    data:studentId,
                    success: function(res){
                        console.log(res)
                    }
                })
    
            })
        }
      deleteStudentDetails()

        // add student details 
        // for that make post request to json server 
        
        function addStudentDetails(){
            $("#student-form").submit (function(e){
            
            
                e.preventDefault();

                if( $('button#submit').hasClass('enabled')===false){
                    let formData = $(this).serialize();
                
        
                    $.ajax({
                        url:url,
                        type: 'POST',
                        data:formData,
                        success:function(student){
                            console.log(formData,"student added");

                            let tableRow = $(`
                            <tr class ='center aligned'>
                                <td>${student.id}</td>
                                <td>${student.name}</td>
                                <td>${student.email}</td>
                                <td>
                                    <button class="ui teal button" id="editStudent" data-id="${student.id}">Edit</button>
                                    <button class="ui red button" id="deleteStudent"  data-id="${student.id}">Delete</button>
                                </td>
                            </tr>
                            `)

                            StudentDetails.append(tableRow)

    
                        }
                        
                    })
                }
            })
        
           
        }
        addStudentDetails()


        function updateStudentDetails(){

            $('body').on('click', "button#editStudent", function(){
                let studentId = $(this).data('id');
                console.log(studentId)
                

                $("input#name").load(url+`/${studentId}`, function(res){
                     let data = JSON.parse(res)
                     $('input#name').val(data.name);
                     $('input#email').val(data.email);
                     $('button#submit').text("Update")
                  
                     // now make patch api call
                     $('button.ui.blue.button').toggleClass("enabled") 


                     if($('button#submit').hasClass("enabled")){

                     
                            $('#student-form').submit(function(e){
                        
                                e.preventDefault();
            
                                let updatedData = $(this).serialize()
                                $.ajax({
                                    url:url+`/${studentId}`,
                                    type:"PATCH",
                                    data:updatedData,
                                    success: function(res){
                                        // loadStudentDetails()
                                        console.log("patch the new data")
                                        console.log(res);
                                    }
                                })
            
                            })
                   
                        }
                })
                
             
                
            })

        }
       updateStudentDetails()

        
}
)




























        //  $.getJSON('http://localhost:3500/students',{
        //     format: "json"
        // }).done(function(res){
        //    $.each(res, function(index, student){
        //     StudentDetails.append("<tr class='center aligned'><td>"+ student.id +"</td><td>" + student.name +"</td><td>" + student.email+ '</td><td><button  id="editEmployee" class="ui teal button" data-id="' + student.id + '">Edit</button> <button id="deleteEmployee" class="ui red button" data-id="' + student.id + '">Delete</button></td></tr>' ) })
        // })