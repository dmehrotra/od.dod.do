
function getDetails(el,callback){
        var contract = {}
        contract.el = el
        contract.amount = amount(el);
    
        contract.purpose = purpose(el);
        contract.authority = authority(el);
        contract.contractor_name = contractor_name(el);
        contract.work = work(el)
        contract.number = number(el)
      
        callback(contract)
}
function authority(el){
    var auth;
    try{
        auth = $(el).html().split(".")[$(el).html().split(".").length - 2].split("is the contracting activity")[0]
        auth_span = $(el).html().replace(auth,'<span class="auth">'+auth+'</span>');
        $(el).html(auth_span)

    }catch(err){
        auth = 'cannot find'
    }
    return auth;
}
function number(el){
    var matches;
    try{
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec($(el).text())[1];
        number_span = $(el).html().replace(matches, '<span class="matches">'+matches+'</span>');
        $(el).html(number_span)
    }catch(err){console.log(err)}
    return matches;
}
function work(el){
   var wrk;
   try{
        wrk = $(el).html().split("Work will be performed")[1].split(", with an")[0].split(", and is")[0]
        wrk_span = $(el).html().replace(wrk, '<span class="wrk">'+wrk+'</span>');
        $(el).html(wrk_span)
        
    }catch(err){console.log(err)}
    return wrk;

}
function purpose(el){
   var prp;
   try{
        prp = $(el).html().split(" contract for")[1].split(".")[0]
        prp_span = $(el).html().replace(prp, '<span class="prp">'+prp+'</span>');
        $(el).html(prp_span)
        
    }catch(err){console.log(err)}
    
    if ( prp == undefined) {
        try{
            prp = $(el).html().split("for the")[1].split(".")[0]
            prp_span = $(el).html().replace(prp, '<span class="prp">'+prp+'</span>');
            $(el).html(prp_span)
        
        }catch(err){console.log(err)}
    }
    return prp;

}


function contractor_name(el){
   var name;
   try{
    
        name = $(el).text().split(",")[0].replace("<span>", "").replace('<span class="body>"',' ')
        name_span = $(el).html().replace(name, '<span class="name">'+name+'</span>');
        $(el).html(name_span)
        
    }catch(err){console.log(err)}
    return name;
}


 

function createContract(el){
    getDetails(el,function(contract){
        
        var html = "<div class='form'>";
        html += "<label>Who is the contractor?</label>"
        html += "<input id='contractor_name' type='text' name='contractor_name' value='"+contract.contractor_name+" '/>"
        html += "<label>Which Department Issued this contract?</label>"
        html += "<input id='department_name' type='text' name='department_name' value=''/>"
        html += "<label>The Date the Contract was issued</label>"
        html += "<input id='contract_date'type='text' name='contract_date' value='"+new Date($('.date').html().split("<br>")[1].replace("        ",'')).toISOString().split('T')[0]+"' />"
        html += "<label>How much money?</label>"
        html += "<input id='amount' type='text' name='amount' value='"+contract.amount+"'>"
        html += "<label>What is the contract for?</label>"
        html += "<input id='purpose'type='text' name='purpose' value='"+contract.purpose+"'/>"
        html += "<label>Where is the work performed?</label>"
        html += "<input id='where'type='text' name='where' value='"+contract.work+"'/>"
        html += "<label>Contract Number</label>"
        html += "<input id='contract_number'type='text' name='contract_number' value='"+contract.number+"'/>"
        html += "<label>Contracting Activity</label>"
        html += "<input id='contracting_activity' type='text' name='contracting_activity' value='"+contract.authority.replace('<span>&nbsp; </span>','').replace('<span>','')+"' />"
        html += "<button class='submit'>sup</button>"
        html += " </div>"
        $(el).append(html)
       console.log(contract)
    })
   
     
}


for ( i = 0; i < $('span.text p').length; i++) { 	 
    if ( $($('span.text p')[i]).html().length > 100 ){
            createContract($('span.text p')[i])
	}

}
$('.submit').click(function(){
    sibs = getSiblings(this,getInputs);
    sendForm(sibs)
    $(this).closest('p').remove()
})

function sendForm(sibs){
    var obj = {
        "contractor_name": sibs[0].value,
        "department_name": sibs[1].value,
        "contract_date": sibs[2].value,
        "amount": sibs[3].value,
        "for_what": sibs[4].value,
        "place_of_work": sibs[5].value,
        "contract_number": sibs[6].value,
        "contracting_activity": sibs[7].value.replace(',',' ')

    }
    $.post('https://javantiger.club:3002/contracts', obj, function(returnedData){
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

  


