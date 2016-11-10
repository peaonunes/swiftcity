function fileReader(filePath){
    d3.json(filePath, function(error, project) {
        if(error)
            throw error;

        console.log(project);

      //Object.keys(project).forEach((projectId) => {
      //});
    });
}
