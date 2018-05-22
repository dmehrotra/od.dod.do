function numbers(el){
    var match = []
    var t = $(el).text().split(' ');
    try{
        for (var i = 1; i < t.length; i++) {  
            if (t[i].split('-').length > 2){
                number_span = $(el).html().replace(t[i], '<span class="matches">'+t[i]+'</span>');
                $(el).html(number_span)
                if(t[i] != 'indefinitely-delivery/indefinite-quantity,' && t[i] != 'indefinitely-delivery/indefinite-quantity' && t[i] != "cost-plus-incentive-fee" && t[i] != 'firm-fixed-price' && t[i] != 'firm-fixed-price,' && t[i] != "cost-plus-incentive-fee," && t[i] != "cost-plus-fixed-fee" && t[i] != 'firm-fixed-price' && t[i] != 'firm-fixed-price' && t[i] != "indefinite-delivery/indefinite-quantity" && t[i]!= 'indefinite-delivery/indefinite-quantity,' && t[i] != 'time-and-materials'){
                    match.push(t[i].replace("(",'').replace(")",'').replace(".",'').replace(";",'').replace(",",''))
                }
                

                
            }    

        }
    }catch(err){console.log(err)}
    if (match == undefined){
    }
    return match
    

}

function getDetails(el,callback){
        
        var contract = {}
        contract.el = el
        contract.amount = $.trim(amount(el));
        contract.numbers = $.trim(numbers(el));
        callback(contract)
}


function createContract(el,department){
    getDetails(el,function(contract){
        
        var html = "<div class='form' style='color:black'>";
       
        html += "<label>Department</label>"
        html += "<input id='department_name' type='text' name='department_name' value='"+department+"'/>"
        html += "<label>Date</label>"
        html += "<input id='filing_date'type='text' name='contract_date' value='"+new Date($('.date').html().split("<br>")[1].replace("        ",'')).toISOString().split('T')[0].trim()+"' />"
        html += "<label>Amount</label>"
        html += "<input id='amount' type='text' name='amount' value='"+contract.amount+"'>"
        html += "<label>Full Text</label>"
        html += "<input id='fulltext'type='textarea' name='full_text' value='"+$(el).text()+"'/>"
        html += "<label>Contract Numbers</label>"
        html += "<input id='contract_numbers' type='text' name='contract_numbers' value='"+contract.numbers+"'>"
        html += "<input id='key'type='hidden' name='key' value='blue32blue32'/>"
        html += "<button class='submit'>Submit</button>"
        html += " </div>"
        $(el).append(html)

      
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
    var obj = {
        "department_name": sibs[0].value,
        "filing_date": sibs[1].value,
        "amount": sibs[2].value,
        "full_text": sibs[3].value,
        "contract_numbers": sibs[4].value,
        "key": sibs[5].value
    }
    $.post('https://quagga.club/api/filing', obj, function(returnedData){         
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

  


