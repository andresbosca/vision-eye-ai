from ultralytics import YOLO

# Load a model
model = YOLO("yolov8n.pt")  # load a pretrained model (recommended for training)

# Use the model
model.train(data="african-wildlife.yaml", epochs=3)  # train the model
metrics = model.val()  # evaluate model performance on the validation set
path = model.export(format="tfjs")  # export the model to TenserFlowJS format
