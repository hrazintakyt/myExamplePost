window.onload = function () {  
    var imageViewerDiv = document.getElementById("imageViewerDiv");  
    var createOptions = new lt.Controls.ImageViewerCreateOptions(imageViewerDiv);  
    var imageViewer = new lt.Controls.ImageViewer(createOptions);  
    imageViewer.itemError.add(function (sender, e) {  
       alert("Error loading " + e.data);  
    });  
 
    imageViewer.imageUrl = null;

    var myButton = document.getElementById("clickButton");
    myButton.onclick = function(){
        var changeSrc = document.getElementById("myImage");
        changeSrc.src = "./assets/merge.png";
    }
 
 
 
 
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
 
    var imageElement = document.querySelector('#myImage');
 
    var observer = new MutationObserver(function(mutations) {
       mutations.forEach(function(mutation) {
         if (mutation.type === "attributes") {
          imageViewer.imageUrl = imageElement.src;
         }
       });
     });
     observer.observe(imageElement, {
       attributes: true 
     });
 
 
    
    
    
 
 
 
    // Create and set up the automation manager using the HTML5 rendering engine  
    var renderingEngine = new lt.Annotations.Rendering.AnnHtml5RenderingEngine();  
    var manager = new lt.Annotations.Automation.AnnAutomationManager.create(renderingEngine);  
                   
    // Create the default annotations objects   
    manager.createDefaultObjects();  
                   
    var currentObject = document.getElementById("currentObject");  
                   
    var automationObjCount = manager.objects.count;  
    for (var i = 0; i < automationObjCount; i++) {  
       // Get the object   
       var automationObj = manager.objects.item(i);  
                   
       // Add its name to the select element   
       var name = automationObj.name;  
       var id = automationObj.id;  
       currentObject.options[currentObject.options.length] = new Option(name, id);  
    }  
                   
    // Hook to its change event  
    currentObject.addEventListener("change", function () {  
       // Get the object ID  
       var id = parseInt(currentObject.options[currentObject.selectedIndex].value);  
                   
       // Set it as the current object in the manager   
       manager.currentObjectId = id;  
    });  
                   
    // When the current object ID changes, we need to update our select  
    manager.currentObjectIdChanged.add(function (sender, e) {  
       var currentObjectId = manager.currentObjectId;  
       for (var i = 0; i < currentObject.options.length; i++) {  
          var id = parseInt(currentObject.options[i].value);  
          if (id === currentObjectId) {  
             currentObject.selectedIndex = i;  
             break;  
          }  
       }  
    });  
                   
                   
    // Create an instance of the Automation control object that works with LEADTOOLS ImageViewer  
    var automationControl = new lt.Demos.Annotations.ImageViewerAutomationControl();  
    // Attach our image viewer  
 
    //===================================================================================
 
    //===================================================================================
 
    //===================================================================================
  
    automationControl.imageViewer = imageViewer;  
                   
 
    //===================================================================================
 
    //===================================================================================
 
    //===================================================================================
 
    // Set the image viewer interactive mode   
    var automationInteractiveMode = new lt.Demos.Annotations.AutomationInteractiveMode();  
    automationInteractiveMode.automationControl = automationControl;  
    imageViewer.defaultInteractiveMode = automationInteractiveMode;  
                   
    // set up the automation (will create the container as well)  
    var automation = new lt.Annotations.Automation.AnnAutomation(manager, automationControl);  
    // Add handler to update the container size when the image size changes  
    imageViewer.itemChanged.add(function (sender, e) {  
       var container = automation.container;  
       container.size = container.mapper.sizeToContainerCoordinates(imageViewer.imageSize);  
    });  
                   
    // set up this automation as the active one  
    automation.active = true;  
                   
    // Hook to the run even so we know when an object enters run mode   
    automation.run.add(function (sender, e) {  
       // e is of type AnnRunDesignerEventArgs   
       if (e.operationStatus == lt.Annotations.Engine.AnnDesignerOperationStatus.start) {  
          // Get the object being run   
          alert("In run mode, you clicked an object of id " + e.object.id);  
       }  
    });  
                   
    // Optional: Add the resources to the automation manager  
    addResources(manager);  
 }  
                    
 function addResources(manager) {  
    // Add images for the stamp, point, hot spot, and lock annotations  
    var resources = new lt.Annotations.Engine.AnnResources(); 
    manager.resources = resources;  
    var rubberStampsResources = resources.rubberStamps;  
    var imagesResources = resources.images;  
                   
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampApproved] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/approved.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampAssigned] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Assigned.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampClient] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Client.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampChecked] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/checked.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampCopy] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Copy.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampDraft] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Draft.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampExtended] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Extended.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampFax] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Fax.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampFaxed] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Faxed.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampImportant] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Important.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampInvoice] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Invoice.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampNotice] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Notice.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampPaid] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Paid.png");  
                   
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampOfficial] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Official.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampOnFile] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Onfile.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampPassed] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Passed.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampPending] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Pending.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampProcessed] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Processed.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampReceived] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Received.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampRejected] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/rejected.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampRelease] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Release.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampSent] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Sent.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampShipped] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/Shipped.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampTopSecret] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/topsecret.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampUrgent] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/urgent.png");  
    rubberStampsResources[lt.Annotations.Engine.AnnRubberStampType.stampVoid] = new lt.Annotations.Engine.AnnPicture("resources/objects/RubberStamps/void.png");  
                   
    imagesResources.add(new lt.Annotations.Engine.AnnPicture("resources/objects/Point.png")); 
    imagesResources.add(new lt.Annotations.Engine.AnnPicture("resources/objects/lock.png")); 
    imagesResources.add(new lt.Annotations.Engine.AnnPicture("resources/objects/hotspot.png"));  
 }  