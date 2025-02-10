using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using MongoDB.Driver.Core.Configuration;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;

        //Using AwsOption for now to get the bucket name, fetching it in AwsServie will need code change in that file as well.
        //To keep it simple adding AwsOption here
        private AwsOptions _options;
        public FileService(IHostingEnvironment environment, 
            IAwsService awsService, IOptions<AwsOptions> options)
        {
            _environment = environment;
            _tempFolder = "images\\";
            _awsService = awsService;
            _options = options.Value;
        }

        public async Task<string> GetFileURL(string fileName, FileType type)
        {
            string fileUrl = string.Empty;
            try
            {
                fileUrl = await _awsService.GetStaticUrl(fileName, _options.AwsBucketName);
                return fileUrl;
            }
            catch (Exception ex)
            {
                // Log the error 
                Console.WriteLine($"Error fetching file url: {ex.Message}");
                return null; // Error occurred while fetching the file url
            }
        }
        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            string filePath = string.Empty;
            string  uniqueFileName = null;
            try
            {
                uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);

                    stream.Position = 0;

                    bool success = await _awsService.PutFileToS3(uniqueFileName, stream, _options.AwsBucketName, false);
                    if (!success)
                    {
                        return null;
                    }
                }
                return uniqueFileName;
            }
            catch (Exception ex)
            {
                // Log the error 
                Console.WriteLine($"Error saving file: {ex.Message}");
                return  null; // Error occurred while saving the file
            }
        }

        public async Task<bool> DeleteFile(string fileName, FileType type)
        {
            try
            {
                var success = await _awsService.RemoveFileFromS3(fileName, _options.AwsBucketName);
                if (!success)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                // Log the error
                Console.WriteLine($"Error deleting file: {ex.Message}");
                return false; // Error occurred while deleting the file
            }

        }

        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
