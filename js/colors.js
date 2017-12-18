
function getDetails(el,callback){
        var contract = {}
        contract.el = el
        contract.amount = amount(el);
        contract.contractor_name = contractor_name(el);
        contract.work = work(el)
        return contract;

}

function work(el){

   var wrk;
   try{
        wrk = $(el).html().split("Work will be performed")[1].split(". ")[0]
        amount_span = $(el).html().replace(wrk, '<span class="wrk">'+wrk+'</span>');
        $(el).html(amount_span)
        
    }catch(err){console.log(err)}
    return wrk;

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
    contract = getDetails(el)
   
     
}

function createForm(nextel,amount){
    //  action='http://104.236.108.140:3214/contracts' method='POST'
    
    var html = "<div class='form'>";
    html += "<label>Contractor Name</label>"
    html += "<input id='contractor_name' type='text' name='contractor_name' />"
    html += "<label>Department</label>"
    html += "<input id='department_name' type='text' name='department_name' />"
    html += "<label>Date</label>"
    html += "<input id='contract_date'type='text' name='contract_date' />"
    html += "<label>Amount</label>"
    html += "<input id='amount' type='text' name='amount' value="+amount+">"
    html += "<label>For what</label>"
    html += "<input id='purpose'type='text' name='purpose' />"
    html += "<label>tags</label>"
    html += "<input id='of_interest'type='text' name='of_interest' />"
    html += "<label>Contract Number</label>"
    html += "<input id='contract_number'type='text' name='contract_number' />"
    html += "<label>Contracting Activity</label>"
    html += "<input id='contracting_activity' type='text' name='contracting_activity' />"
    html += "<button class='submit'>sup</button>"
    html += " </div>"
  
    $(nextel).html(html)

}

for ( i = 0; i < $('span.text p').length; i++) { 	 
    if ( $($('span.text p')[i]).html().length > 100 ){
            createContract($('span.text p')[i])
	}

}
$('.submit').click(function(){
    sibs = getSiblings(this,getInputs);
 // submit form
})
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

