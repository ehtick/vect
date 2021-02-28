import {Injectable} from '@angular/core';
import {DiagramItem, DiagramMetadata} from '../model/diagram-item.model';
import {eqCondition, GoogleDriveService, inCondition, MIME_DIAGRAM_FILE, MIME_FOLDER, QUERY_NOT_DELETED} from './google-drive.service';
import {NewDiagramDialogData} from '../../manager/new-diagram-dialog/new-diagram-dialog.component';
import {TemplateService} from './template.service';
import {MatSnackBar} from '@angular/material/snack-bar';

const VECT_FOLDER_NAME = 'Vect';

export function fileToDiagramItem(file: any): DiagramItem {
  const item: DiagramItem = {
    id: file.id,
    name: file.name,
    description: file.properties?.description,
    image: file.properties?.image
  };
  return item;
}

@Injectable()
export class DiagramService {

  private initialized = false;
  private vectFolderId: string;

  constructor(
    protected drive: GoogleDriveService,
    protected templateService: TemplateService,
    private snackBar: MatSnackBar
  ) {
  }

  public async init(): Promise<void> {
    if (!this.initialized) {
      // console.log('DiagramService.init');
      const result = await this.drive.createIfAbsent(VECT_FOLDER_NAME, MIME_FOLDER);
      if (result.created) {
        this.snackBar.open('Creating sample diagrams. Please wait...', 'Ok', {
          duration: 5000
        });
        // Generate sample diagrams (if user is newly joined):
        for (const template of this.templateService.getTemplateList()) {
          await this.create({
            template,
            name: template.name,
            description: 'This diagram was automatically created from a template to demonstrate basic functionality'
          });
        }
      }
      this.vectFolderId = result.id;
      this.initialized = true;
    }
  }

  public async list(): Promise<Array<DiagramItem>> {
    // console.log('DiagramService.list');
    await this.init();

    // Get list of files without details
    const list = await this.drive.list([
      QUERY_NOT_DELETED,
      eqCondition('mimeType', MIME_DIAGRAM_FILE),
      inCondition('parents', this.vectFolderId)
    ]);
    // console.log('DiagramService.list response', list);

    return await list.result.files.map(file => {
      // console.log('DiagramService.list map', file);
      const item = fileToDiagramItem(file);
      return item;
    });

  }

  public async get(id: string): Promise<DiagramItem> {
    // console.log('DiagramService.get', id);
    await this.init();

    // Retrieve diagram meta information
    const fileMeta = await this.drive.readFileMeta(id);
    // console.log('DiagramService.get fileMeta', fileMeta.result);
    const item = fileToDiagramItem(fileMeta.result);

    // Download diagram content
    const fileContent = await this.drive.downloadFile(id);
    item.diagramSource = fileContent;

    // console.log('DiagramService.get result', item);
    return item;
  }


  public async create(diagram: NewDiagramDialogData): Promise<DiagramItem> {
    // console.log('DiagramService.create', diagram);
    await this.init();

    const properties: DiagramMetadata = {
      description: diagram.description,
      image: 'assets/svg/sitemap-solid.svg',
    };

    const diagramSource = (diagram.template?.id ? this.templateService.getTemplate(diagram.template.id).diagramSource : '');

    const id = await this.drive.uploadFile(
      undefined,
      diagram.name,
      MIME_DIAGRAM_FILE,
      this.vectFolderId,
      diagramSource,
      properties
    );

    return {
      id,
      name: diagram.name,
      description: diagram.description,
      diagramSource: ''
    };

  }


  public async save(item: DiagramItem): Promise<void> {
    // console.log('DiagramService.save', item);
    await this.init();

    const properties: DiagramMetadata = {
      description: item.description,
      image: 'assets/svg/sitemap-solid.svg',
    };

    await this.drive.uploadFile(
      item.id,
      item.name,
      MIME_DIAGRAM_FILE,
      this.vectFolderId,
      item.diagramSource,
      properties
    );
  }


  public async delete(id: string): Promise<void> {
    // console.log('DiagramService.delete', id);
    await this.init();
    await this.drive.delete(id);
  }

}
