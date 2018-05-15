
function getDetails(el,callback){
        
        var contract = {}
        contract.el = el
        contract.amount = $.trim(amount(el));
        callback(contract)
}


function createContract(el,department){
    getDetails(el,function(contract){
        
        var html = "<div class='form' style='color:black'>";
       
        html += "<label>Department</label>"
        html += "<input id='department_name' type='text' name='department_name' value='"+department+"'/>"
        html += "<label>Date</label>"
        html += "<input id='contract_date'type='text' name='contract_date' value='"+new Date($('.date').html().split("<br>")[1].replace("        ",'')).toISOString().split('T')[0].trim()+"' />"
        html += "<label>Amount</label>"
        html += "<input id='amount' type='text' name='amount' value='"+contract.amount+"'>"
        html += "<label>Full Text</label>"
        html += "<input id='fulltext'type='textarea' name='full_text' value='"+$(el).text()+"'/>"
        html += "<input id='key'type='hidden' name='key' value='blue32blue32'/>"
        html += "<button class='submit'>Submit</button>"
        html += " </div>"
        $(el).append(html)

       console.log(contract)
    })    
}

for ( i = 0; i < $('span.text p').length; i++) { 	 
    var department;
    el = $('span.text p')[i]
    first_child = $(el).children()[0]
    if ($(first_child).is("strong") && $(first_child).text().length > 1){
        department = $(first_child).text()
    }
    if ( $($('span.text p')[i]).html().length > 100 ){
            
            createContract($('span.text p')[i],department)
	}

}
$('.submit').click(function(){
    sibs = getSiblings(this,getInputs);
    sendForm(sibs)
    $(this).closest('p').remove()
})

function sendForm(sibs){
    console.log(sibs)
    var obj = {
        "department_name": sibs[0].value,
        "filing_date": sibs[1].value,
        "amount": sibs[2].value,
        "full_text": sibs[3].value,
        "key": sibs[4].value
    }
    $.post('localhost:8000/api/filing', obj, function(returnedData){         
         console.log(returnedData);
    });

  
}
function getSiblings(el, filter) {
   
    var siblings = [];
    el = el.parentNode.firstChild;
    do { if (!filter || filter(el)) siblings.push(el); } while (el = el.nextSibling);
    return siblings;
}
function getInputs(el) {
    return el.nodeName.toLowerCase() == 'input';
}
function amount(el){
   var amnt;
   try{
        amnt = $(el).html().split("$")[1].split(" ")[0]
        amount_span = $(el).html().replace(amnt, '<span class="amount">'+amnt+'</span>');
        $(el).html(amount_span)
        
    }catch(err){console.log(err)}
    return amnt;
}

  


