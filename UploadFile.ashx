<%@ WebHandler Language="C#" Class="UploadFile" %>
/*
 | Version 10.1.1
 | Copyright 2012 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */

using System;
using System.Web;
using System.IO;

public class UploadFile : IHttpHandler {

    public void ProcessRequest (HttpContext context)
    {
        // Upload the file
        bool ok = false;
        string filename = "";
        string fileKey = "";
        string uploader = "unknown";
        if(0 < context.Request.Files.Count)
        {
            try
            {
                fileKey = context.Request.Files.Keys[0];
                uploader = "Form";
                if(fileKey.EndsWith("s[]")) uploader = "HTML5";
                else if(fileKey.EndsWith("Flash")) uploader = "Flash";

                string filePath = context.Server.MapPath("Uploads");
                filename = context.Request.Files[0].FileName;
                if(0 < filename.Length)
                {
                    // Timestamp the file so that it doesn't stomp on an existing file of the same name
                    // and so that we can provide a unique name back to the uploader
                    long timestamp = DateTime.UtcNow.Ticks;
                    filename = timestamp.ToString() + "_" + filename;
                    string fullFilename = filePath + "//" + filename;
                    context.Request.Files[0].SaveAs(fullFilename);

                    ok = true;
                }
            }
            catch(Exception)
            {
            }
        }

        // Provide the expected response

        // http://dojotoolkit.org/reference-guide/dojox/form/Uploader.html
        if("Flash" == uploader)
        {
            // Response to Flash uploader
            context.Response.Write("file=" + filename + ",name=" + filename
                + ",uploader=" + uploader);
            if(!ok) context.Response.Write(",error=Unable to save file");
        }
        else
        {
            // Response to HTML5/form uploader; latter needs to be bracketed by <textarea>
            if("Form" == uploader) context.Response.Write("<textarea>");

            context.Response.Write("[{'file':'" + filename + "','name':'" + filename
                + "','uploader':'" + uploader + "'"
                + (ok? "" : ",'error':'Unable to save file'" ) + "}]");

            if("Form" == uploader) context.Response.Write("</textarea>");
        }
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}