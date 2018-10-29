
natural.BayesClassifier.load('classifier.json', null, function (err, classifier) {
    console.log(classifier.classify('long SUNW'));
    console.log(classifier.classify('short SUNW'));
});